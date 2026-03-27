---
layout: ../../layouts/Project.astro
title: Comprehensive Config
description: Create models to validate, write, and read configuration files across a variety of interchangeable file formats.
tech: Python
github: https://github.com/Summersweet-Software/ComprehensiveConfig
---

## Overview

Comprehensive Config lets you define configuration schemas as Python classes. It validates, reads, and writes config files in multiple formats.

## Getting Started

Define a spec by subclassing `ConfigSpec`. Sections become nested classes, and fields use typed descriptors like `Integer`, `Text`, and `Float`.

```python
from comprehensiveconfig import ConfigSpec
from comprehensiveconfig.spec import Section, Integer, Float, Text, List
from comprehensiveconfig.toml import TomlWriter
```

## Defining a Schema

```python
class MyConfigSpec(ConfigSpec,
                default_file="myconfig.toml",
                writer=TomlWriter,
                create_file=True):
    class MySection(Section, name="My_Section"):
        some_field = Integer(10)
        other_field = Text("Some Default Text")

        class SubSection(Section):
            """An example Sub Section"""
            x = Integer(10)

    class Credentials(Section):
        """Example credentials section"""
        email = Text("example@email.com")
        password = Text("MyPassword")

    some_field = Float(6.9)
    list_of_stuff = List(["12", "13", "14"], inner_type=Text())
```

## Reading Values

Access values directly from the class after loading. The global config is loaded automatically when a default file exists.

```python
# Accessing values from globally loaded config
print(MyConfigSpec.some_field)
print(MyConfigSpec.MySection.other_field)

# Load a second config explicitly
second_config = MyConfigSpec.load("another_config.toml", TomlWriter)
```

## TOML Output

The schema above produces the following TOML file:

```toml
some_field = 6.9
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
password = "MyPassword"
```
