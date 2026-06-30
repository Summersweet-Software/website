---
layout: ../../layouts/Project.astro
title: Compiler Toolkit
description: An opinionated library for creating parsers and compilers in python.
tech: Python
github: https://github.com/Summersweet-Software/compilertoolkit
---

## Overview

CompilerToolkit is a library designed to help you create well-organized, large compilers in python. It helps with ensuring proper annotations and typing support throughout your entire codebase.
It also provides many utilities for pretty error printing and tree handling.

## Release/Version Information

Currently this project is unfinished and does not have a `v1.0` on pypi or github.

## Features

- [x] Ast Creation Tools
- [x] Ast Walk functionality built in
- [x] Ast node typing garauntees (ensure that all nodes are well defined)
- [x] Ast nodes having configurable parser patterns (WIP, needs to be more ergonomic)
- [x] Utility decorators for annotation of individual parts of the compilers
- [x] Parser pattern builder
  - [ ] unions on patterns (`or` clause)
  - [ ] `and` clause on patterns
- [ ] Parser builder (WIP, needs to be more ergonomic)
- [ ] Parser check functions built into patterns to allow automatic syntax error parsing.
- [x] Source error highlighting (fine grained highlights)
- [x] Package and module tree utilities
- [x] Lexing via rply library (and utilities)
- [x] Parser token class builtin
- [x] `NTree` utility type to help make things like module/package trees

## Example usage of `NTree`'s

```python
class ModuleName:
  ... # implemented in full example on github

class Module:
  ... # implemented in full example on github

class ModuleView:
  ... # implemented in full example on github

class Package(NTree[ModuleView, str]):
    """An example of an extension of NTree"""
  ... # implemented in full example on github


imports = Package(
    identifier="base",
    leaves=[
        Module("main", private=True),
        Module("other_mod"),
        Package(
            identifier="lib",
            leaves=[
                Module("math"),
                Module("system"),
                Module("err"),
                Package(
                    identifier="ui",
                    leaves=[
                        Module("application"),
                        Module("widgets"),
                        Module("internal_stuff", private=True),
                        Package(
                            identifier="bindings",
                            leaves=[
                                Module("application", private=True),
                                Module("widgets", private=True),
                            ],
                        ),
                    ],
                ),
            ],
        ),
    ],
)

# NTree supports:
#  - intersection via `&` operator
#  - combining via `|` op
#  - custom leaf initialization (useful for those ModuleView classes)
#  - Two kinds of indexing (NTree indexing and Leaf node indexing) via the index operator
#  - Comparison via `==`
#  - arbitrary tree/leaf matching (via common interface/protocol)
#  - Fully supported type annotation that work fantastically (avoiding bare type unions and instead using overloads to provide more accurate typing when calling a function or using an operator)


# Setup trees to do testing against
# ===================================

trying_to_import = NTree[ModuleName, str](
    identifier="base", leaves=[ModuleName("other_mod")]
)

trying_to_import_2 = NTree[ModuleName, str](
    identifier="base",
    leaves=[NTree(identifier="lib", leaves=[ModuleName("math")])],
)

trying_to_import_partial = NTree[ModuleName, str](
    identifier="base",
    leaves=[
        NTree(identifier="lib", leaves=[ModuleName("something_that_does_not_exist")])
    ],
)
# Test Basic overlapping
# ========================
assert imports.overlaps(trying_to_import)
assert imports.overlaps(trying_to_import_2)
assert not imports.overlaps(trying_to_import_partial)


# Test Basic intersection
# =========================

print()
print(imports & trying_to_import)
print(imports & trying_to_import_2)
print(imports & trying_to_import_partial)

assert (imports & trying_to_import).children == [imports[ModuleName("other_mod")]]
assert (imports & trying_to_import_2).children == [
    imports["lib"].copy().set_leaves((imports["lib"]["math"],))
]
assert (imports & trying_to_import_partial).children == [
    imports["lib"].copy().set_leaves([])
]

# Test Basic combining
# ======================
print()

trying_to_import_resolved = imports & trying_to_import
trying_to_import_2_resolved = imports & trying_to_import_2
trying_to_import_partial_resolved = Package(
    identifier="base",
    leaves=[
        Package(identifier="lib", leaves=[Module("something_that_does_not_exist")])
    ],
)

print(imports | trying_to_import_resolved)
print(imports | trying_to_import_2_resolved)
print(imports | trying_to_import_partial_resolved)

assert (imports | trying_to_import_resolved) == imports
assert (imports | trying_to_import_2_resolved) == imports
changed_tree = imports.copy()
changed_tree["lib"] = (
    changed_tree["lib"]
    .copy()
    .add_leaf(
        trying_to_import_partial_resolved["lib"][
            ModuleName("something_that_does_not_exist")
        ]
    )
)
assert (imports | trying_to_import_partial_resolved) == changed_tree

# Test Basic tree indexing
# ==========================
print()

lib_pkg = imports["lib"]
print(lib_pkg)
assert isinstance(lib_pkg, Package) and lib_pkg.identifier == "lib"

# Test private imports
# ######################
try:
    imports[ModuleName("main")]  # should not work
    raise Exception("Expected an error")
except PrivateImportExc:
    main_mod = imports[ModuleName("main", parent=imports)]
    print(main_mod)
    assert isinstance(main_mod, ModuleView) and main_mod.mod.name == "main"

```

## Test usage of AST utilities

```python
from typing import Any
from compilertoolkit.ast import (
    AbstractAstNode,
    abstractcompilationstep,
    compilationstep,
)
from compilertoolkit.exceptions import (
    CompilerError,
    ParsingError,
    UnexpectedToken,
    ansi_highlight_line,
    create_underline,
    format_file_position,
)
from compilertoolkit.parsing import ParseThenCheck, Parser, ParsingPattern, TokenHasType
from compilertoolkit.tokens import (
    Ignore,
    Source,
    SourcePosition,
    TokenEnum,
    TokenType,
    create_lexer,
)


class Token[T](TokenEnum[T]):
    """Part of our own Stuff"""

    Comma: TokenType[str] = TokenType(pattern=r"\,")
    Number: TokenType[str] = TokenType(pattern=r"\d+")
    Keyword: TokenType[str] = TokenType(pattern=r"\w+")
    Plus: TokenType[str] = TokenType(pattern=r"\+")

    Expression: TokenType["ExpressionNode"] = TokenType()
    Statement: TokenType["AstNode"] = TokenType()
    EOF: TokenType[None] = TokenType()

    whitespace = Ignore(r"\s+")  # ignore all whitespace


class AstNode(AbstractAstNode):
    """Basic Ast Node"""

    __slots__ = ()

    @abstractcompilationstep(0)
    def analyze_types(self, ctx):
        pass

    @abstractcompilationstep(1)
    def compile(self, ctx) -> Any:
        pass


class ExpressionNode(AstNode):
    """Basic Ast Node"""

    __slots__ = "return_type"

    # instance variables
    return_type: None | type  # Your own type class


class NumberLiteral(ExpressionNode):
    """Basic Ast Node"""

    __slots__ = "value"

    class ParserPattern(ParsingPattern, token_type=Token.Expression):
        value = TokenHasType(Token.Number)

    # instance variables
    value: int

    def __init__(self, tokens: ParserPattern):
        super().__init__(tokens)
        self.value = int(tokens.value.value)

    @compilationstep
    def analyze_types(self, ctx):
        self.return_type = int

    @compilationstep
    def compile(self, ctx):
        return self.value


class SumNode(ExpressionNode):
    """Basic Ast Node"""

    __slots__ = ("lhs", "rhs")

    class ParserPattern(ParsingPattern, token_type=Token.Expression, precedence=1):
        lhs = TokenHasType(Token.Expression)
        operation = TokenHasType(Token.Plus)
        # Parses, then checks for the specified case, errors if the value of the token is unparsed
        rhs = ParseThenCheck(
            TokenHasType(Token.Expression),
            err_on_false="Expected expression on right hand side",
        )

    # instance variables
    lhs: ExpressionNode
    rhs: ExpressionNode

    def __init__(self, tokens: ParserPattern):
        super().__init__(tokens)
        self.rhs = tokens.rhs.value
        self.lhs = tokens.lhs.value

    @compilationstep
    def analyze_types(self, ctx):
        self.lhs.analyze_types(ctx)
        self.rhs.analyze_types(ctx)
        self.return_type = int

    @compilationstep
    def compile(self, ctx):
        return self.lhs.compile(ctx) + self.rhs.compile(ctx)


def print_error(e: CompilerError, title: str):
    print(f"""{title}:
| {e.msg}
| {f"line: {format_file_position(e.positions[0])}" if e.positions[0].source.filename else ""}
Line:
| {e.positions[0].line-1}. {ansi_highlight_line(source.lines[e.positions[0].line-1], e.positions)}
| {e.positions[0].line-1}. {create_underline(source.lines[e.positions[0].line-1], e.positions, e.pattern_position)}
""")
    exit(1)


source = Source("   borger 8 + gaming", filename="borger.json")

lexer = create_lexer(Token)
tokens = lexer.lex(source)
EOF = Token.EOF(SourcePosition(-1, -1, -1, -1, source), None)
try:
    parser = Parser(EOF)
    parser.add_rule(NumberLiteral.ParserPattern)\
          .add_rule(SumNode.ParserPattern)
    parsed_tokens = parser.parse(tokens, 0, 0)
    if any(not isinstance(tok.value, AstNode) for tok in parsed_tokens):
        raise ParsingError(
            [
                tok.position
                for tok in parsed_tokens
                if not isinstance(tok.value, AstNode)
            ],
            "Unexpected Token",
        )

    parsed_tokens[0].value.analyze_types({})

except UnexpectedToken as e:
    print_error(e, "Unexpected Token")

except CompilerError as e:
    print_error(e, "Error")
```
