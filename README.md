# Вычислитель отличий

[![Actions Status](https://github.com/Bosqy/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Bosqy/frontend-project-46/actions)
[![bosqy-check](https://github.com/Bosqy/frontend-project-46/actions/workflows/bosqy-check.yml/badge.svg)](https://github.com/Bosqy/frontend-project-46/actions/workflows/bosqy-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/4fb4697ec2c6b7fb63ad/maintainability)](https://codeclimate.com/github/Bosqy/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4fb4697ec2c6b7fb63ad/test_coverage)](https://codeclimate.com/github/Bosqy/frontend-project-46/test_coverage)

## Описание проекта

«Вычислитель отличий» — утилита командной строки, определяющая разницу между двумя структурами данных.
Возможности утилиты:

* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

### Системные требования и установка
Для работы проекта потребуется [Node.js®](https://nodejs.org/en/) версии не ниже v16.

### Инструкция по установке
* Клонируем репозиторий
* В папке с репозиторием выполняем `make install`
* В папке с репозиторием выполняем `npm link` (Возможно, потребуется `sudo npm link`)

### Запуск

```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <format>  output format (default: "stylish")
  -h, --help             display help for command
```


## Примеры работы
* Сравнение JSON
[![asciicast](https://asciinema.org/a/UCu5r4Hsxe3VRP69Zio60MXYK.svg)](https://asciinema.org/a/UCu5r4Hsxe3VRP69Zio60MXYK)

* Сравнение YAML

[![asciicast](https://asciinema.org/a/BRwEZNUR4ft6wO2RlxJin8UFp.svg)](https://asciinema.org/a/BRwEZNUR4ft6wO2RlxJin8UFp)

* Рекурсивное сравнение JSON, YAML

[![asciicast](https://asciinema.org/a/FGNtt4PZMJZhnJRvshpVPfWeG.svg)](https://asciinema.org/a/FGNtt4PZMJZhnJRvshpVPfWeG)

* Плоский формат

[![asciicast](https://asciinema.org/a/uQ3IdzSxLSlCTKFXKIY91zI1V.svg)](https://asciinema.org/a/uQ3IdzSxLSlCTKFXKIY91zI1V)

* Формат JSON

[![asciicast](https://asciinema.org/a/03FkQvgFobo2Xk1IzKWOtPlLn.svg)](https://asciinema.org/a/03FkQvgFobo2Xk1IzKWOtPlLn)
