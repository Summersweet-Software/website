import { Container } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
export function ComprehensiveConfigProjectPage() {
  return (
    <Container>
      <h1>Comprehensive Config</h1>
      <p>
        Comprehensive Config is a project that allows a user to create models to
        validate, write, and read their configuration files in a variety of
        interchangable file formats.
      </p>
      <a href="https://github.com/Summersweet-Software/ComprehensiveConfig">
        Github
      </a>
      <hr />
      <h2>Example</h2>
      <SyntaxHighlighter language="python" style={docco}>
        {`# example.py
from comprehensiveconfig import ConfigSpec
from comprehensiveconfig.spec import Section, Integer, Float, Text, List
from comprehensiveconfig.toml import TomlWriter

class MyConfigSpec(ConfigSpec,
                default_file="myconfig.toml",
                writer=TomlWriter,
                create_file=True):
    class MySection(Section, name="My_Section"):
        some_field = Integer(10)
        other_field = Text("Some Default Text")

        class SubSection(Section):
            '''An example Sub Section'''
            x = Integer(10)

    class Credentials(Section):
        '''Example credentials section'''
        email = Text("example@email.com", regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]\{2,\}$")
        password = Text("MyPassword")

    some_field = Float(6.9)
    list_of_stuff = List(["12", "13", "14"], inner_type=Text())


# Accessing values from globally loaded config (if one exists, otherwise it accesses the actual Field class)
print(MyConfigSpec.some_field)
print(MyConfigSpec.MySection.other_field)

# Another way to open configuration
second_config = MyConfigSpec.load("another_config.toml", TomlWriter)`}
      </SyntaxHighlighter>
      <br />
      <h3>Toml Output</h3>
      <SyntaxHighlighter language="toml" style={docco}>
        {`some_field = 6.9
list_of_stuff = ["12", "13", "14"]

[My_Section]
some_field = 10
other_field = "Some Default Text"

[My_Section.SubSection]
# An example Sub Section
x = 10

[Credentials]
# Example credentials section
email = "example@email.com"
password = "MyPassword"`}
      </SyntaxHighlighter>
    </Container>
  );
}
