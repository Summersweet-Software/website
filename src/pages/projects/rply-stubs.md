---
layout: ../../layouts/Project.astro
title: RPLY-stubs
description: A type stubs library for the popular `rply` python package.
tech: Python
github: https://github.com/Summersweet-Software/rply-stubs
---

## Overview

A stubs library for [RPLY](https://pypi.org/project/rply/).

# Correctness

This is an independent static analysis of the types being used. The original rply codebase is quite messy. 
This is all to say that the type annotations provided are not always correct but provide a firm guideline in an otherwise untyped library.

# Completeness

| symbol | meaning       |
| ------ | ------------- |
| ⚪     | partial       |
| ❌     | Not worked on |
| ✅     | completed     |

| Module          | Status |
| --------------- | :----: |
| errors          |   ✅   |
| grammar         |   ⚪   |
| lexer           |   ✅   |
| lexergenerator  |   ✅   |
| parser          |   ✅   |
| parsergenerator |   ⚪   |
| token           |   ✅   |
| utils           |   ✅   |


email = "example@email.com"
password = "MyPassword"
```
