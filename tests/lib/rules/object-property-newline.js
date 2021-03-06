/**
 * @fileoverview Rule to enforce placing object properties on separate lines.
 * @author Vitor Balocco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/object-property-newline"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("object-property-newline", rule, {

    valid: [

        // default-case
        "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'\n};",
        "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n, k4: 'val4'\n};",
        "var obj = { k1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4' };",
        "var obj = { k1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n, k4: 'val4' };",
        "var obj = { k1: 'val1' };",
        "var obj = {\nk1: 'val1'\n};",
        "var obj = {};",
        { code: "var obj = {\n[bar]: 'baz',\nbaz\n};", parserOptions: { ecmaVersion: 6 } },
        { code: "var obj = {\nk1: 'val1',\nk2: 'val2',\n...{}\n};", parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = { k1: 'val1',\nk2: 'val2',\n...{} };", parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = { ...{} };", parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        "foo({ k1: 'val1',\nk2: 'val2' });",
        "foo({\nk1: 'val1',\nk2: 'val2'\n});",
        { code: "foo({\na,\nb\n});", parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\na,\nb,\n});", parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nbar() {},\nbaz\n});", parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\n[bar]: 'baz',\nbaz \n})", parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nk1: 'val1',\nk2: 'val2',\n...{}\n});", parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({ k1: 'val1',\nk2: 'val2',\n...{} });", parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({ ...{} });", parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },

        // allowMultiplePropertiesPerLine: true
        { code: "var obj = { k1: 'val1', k2: 'val2', k3: 'val3' };", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = {\nk1: 'val1', k2: 'val2', k3: 'val3'\n};", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = { k1: 'val1' };", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = {\nk1: 'val1'\n};", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = {};", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = { 'k1': 'val1', k2: 'val2', ...{} };", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {\n'k1': 'val1', k2: 'val2', ...{}\n};", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({ k1: 'val1', k2: 'val2' });", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "foo({\nk1: 'val1', k2: 'val2'\n});", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "foo({ a, b });", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({ bar() {}, baz });", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({ [bar]: 'baz', baz })", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({ 'k1': 'val1', k2: 'val2'});", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({\n'k1': 'val1', k2: 'val2'\n});", options: [{ allowMultiplePropertiesPerLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {k1: ['foo', 'bar'], k2: 'val1', k3: 'val2'};", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = {\nk1: ['foo', 'bar'], k2: 'val1', k3: 'val2'\n};", options: [{ allowMultiplePropertiesPerLine: true }] },
        { code: "var obj = {\nk1: 'val1', k2: {e1: 'foo', e2: 'bar'}, k3: 'val2'\n};", options: [{ allowMultiplePropertiesPerLine: true }] },

        // applyToDestructuring: true
        { code: "var {\nk1: val1,\nk2: val2,\nk3: val3,\nk4: val4\n} = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var { k1: val1,\nk2: val2,\nk3: val3,\nk4: val4, } = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var { k1: val1 } = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var {\nk1: val1\n} = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var {} = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var {\n[bar]: baz,\nbaz\n} = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var {\nk1: val1,\nk2: val2} = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },
        { code: "var { k1: val1,\nk2: val2,\n} = obj;", options: [{ applyToDestructuring: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } } },

        // applyToImports: true
        { code: "import {k1} from 'obj'", parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } } },
        { code: "import {k1 as val1,\nk2 as val2,} from 'obj'", parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } } },
        { code: "import {\nk1,k2} from 'obj'", parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } } },
        { code: "import {\nk1, \nk2, \nk3} from 'obj'", parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } } },
        { code: "import {\nk1,\nk2\n} from 'obj'", parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } } }

    ],

    invalid: [

        // default-case
        {
            code: "var obj = { k1: 'val1', k2: 'val2', k3: 'val3' };",
            output: "var obj = { k1: 'val1',\nk2: 'val2',\nk3: 'val3' };",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                },
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 37
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2'\n};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: 'val2',\nk3: 'val3', k4: 'val4'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'\n};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                },
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {k1: ['foo', 'bar'], k2: 'val1'};",
            output: "var obj = {k1: ['foo', 'bar'],\nk2: 'val1'};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 32
                }
            ]
        },
        {
            code: "var obj = {k1: [\n'foo', 'bar'\n], k2: 'val1'};",
            output: "var obj = {k1: [\n'foo', 'bar'\n],\nk2: 'val1'};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: {e1: 'foo', e2: 'bar'}, k3: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: {e1: 'foo',\ne2: 'bar'},\nk3: 'val2'\n};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                },
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 29
                },
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 41
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1',\nk2: {e1: 'foo', e2: 'bar'},\nk3: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: {e1: 'foo',\ne2: 'bar'},\nk3: 'val2'\n};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 17
                }
            ]
        },
        {
            code: "var obj = { k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n], k3: 'val3' };",
            output: "var obj = { k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n],\nk3: 'val3' };",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = { k1: 'val1', [\nk2]: 'val2' };",
            output: "var obj = { k1: 'val1',\n[\nk2]: 'val2' };",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                }
            ]
        },
        {
            code: "var obj = { k1: 'val1', ...{} };",
            output: "var obj = { k1: 'val1',\n...{} };",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', ...{}\n};",
            output: "var obj = {\nk1: 'val1',\n...{}\n};",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "foo({ k1: 'val1', k2: 'val2' });",
            output: "foo({ k1: 'val1',\nk2: 'val2' });",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "foo({\nk1: 'val1', k2: 'val2'\n});",
            output: "foo({\nk1: 'val1',\nk2: 'val2'\n});",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "foo({ a, b });",
            output: "foo({ a,\nb });",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "foo({\na, b\n});",
            output: "foo({\na,\nb\n});",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 4
                }
            ]
        },
        {
            code: "foo({\nbar() {}, baz\n});",
            output: "foo({\nbar() {},\nbaz\n});",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 11
                }
            ]
        },
        {
            code: "foo({\n[bar]: 'baz', baz\n})",
            output: "foo({\n[bar]: 'baz',\nbaz\n})",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 15
                }
            ]
        },
        {
            code: "foo({ k1: 'val1', [\nk2]: 'val2' })",
            output: "foo({ k1: 'val1',\n[\nk2]: 'val2' })",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "foo({ k1: 'val1', ...{} })",
            output: "foo({ k1: 'val1',\n...{} })",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "foo({\nk1: 'val1', ...{}\n})",
            output: "foo({\nk1: 'val1',\n...{}\n})",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\na: {\nb: 1,\nc: 2\n}, d: 2\n};",
            output: "var obj = {\na: {\nb: 1,\nc: 2\n},\nd: 2\n};",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 5,
                    column: 4
                }
            ]
        },
        {
            code: "({ foo: 1 /* comment */, bar: 2 })",
            output: "({ foo: 1 /* comment */,\nbar: 2 })",
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 26
                }
            ]
        },
        {
            code: "({ foo: 1, /* comment */ bar: 2 })",
            output: null, // not fixed due to comment
            errors: [
                {
                    message: "Object properties must go on a new line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 26
                }
            ]
        },

        // allowMultiplePropertiesPerLine: true
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\nk1:\n'val1', k2: 'val2', k3:\n'val3'\n};",
            output: "var obj = {\nk1:\n'val1',\nk2: 'val2',\nk3:\n'val3'\n};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 9
                },
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 21
                }
            ]
        },
        {
            code: "var obj = {k1: [\n'foo',\n'bar'\n], k2: 'val1'};",
            output: "var obj = {k1: [\n'foo',\n'bar'\n],\nk2: 'val1'};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {k1: [\n'foo', 'bar'\n], k2: 'val1'};",
            output: "var obj = {k1: [\n'foo', 'bar'\n],\nk2: 'val1'};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: {\ne1: 'foo', e2: 'bar'\n}, k3: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: {\ne1: 'foo', e2: 'bar'\n},\nk3: 'val2'\n};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                },
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = { k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n], k3: 'val3' };",
            output: "var obj = { k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n],\nk3: 'val3' };",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = { [\nk1]: 'val1', k2: 'val2' };",
            output: "var obj = { [\nk1]: 'val1',\nk2: 'val2' };",
            options: [{ allowMultiplePropertiesPerLine: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 14
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', ...{}\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\n...{}\n};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\n...{},\nk1: 'val1', k2: 'val2'\n};",
            output: "var obj = {\n...{},\nk1: 'val1',\nk2: 'val2'\n};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "foo({ [\nk1]: 'val1', k2: 'val2' })",
            output: "foo({ [\nk1]: 'val1',\nk2: 'val2' })",
            options: [{ allowMultiplePropertiesPerLine: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 14
                }
            ]
        },
        {
            code: "foo({\nk1: 'val1',\nk2: 'val2', ...{}\n})",
            output: "foo({\nk1: 'val1',\nk2: 'val2',\n...{}\n})",
            options: [{ allowMultiplePropertiesPerLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "foo({\n...{},\nk1: 'val1', k2: 'val2'\n})",
            output: "foo({\n...{},\nk1: 'val1',\nk2: 'val2'\n})",
            options: [{ allowMultiplePropertiesPerLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "Object properties must go on a new line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },

        // applyToDestructuring
        {
            code: "var { k1: val1, k2: val2, k3: val3 } = obj;",
            output: "var { k1: val1,\nk2: val2,\nk3: val3 } = obj;",
            options: [{ applyToDestructuring: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } },
            errors: [
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 17
                },
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 27
                }
            ]
        },
        {
            code: "var {\nk1: val1, k2: val2\n} = obj;",
            output: "var {\nk1: val1,\nk2: val2\n} = obj;",
            options: [{ applyToDestructuring: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } },
            errors: [
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 2,
                    column: 11
                }
            ]
        },
        {
            code: "var {\nk1: val1, k2: val2,\nk3: val3, k4: val4\n} = obj;",
            output: "var {\nk1: val1,\nk2: val2,\nk3: val3,\nk4: val4\n} = obj;",
            options: [{ applyToDestructuring: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } },
            errors: [
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 2,
                    column: 11
                },
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 3,
                    column: 11
                }
            ]
        },
        {
            code: "var { k1: val1, [\nk2]: val2 } = obj;",
            output: "var { k1: val1,\n[\nk2]: val2 } = obj;",
            options: [{ applyToDestructuring: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } },
            errors: [
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 17
                }
            ]
        },
        {
            code: "var { k1: val1, k2: val2 } = obj;",
            output: "var { k1: val1,\nk2: val2 } = obj;",
            options: [{ applyToDestructuring: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { destructuring: true } },
            errors: [
                {
                    message: "Destructured properties must go on a new line.",
                    type: "ObjectPattern",
                    line: 1,
                    column: 17
                }
            ]
        },
        {
            code: "import {\nx, y\n} from 'y'",
            output: "import {\nx,\ny\n} from 'y'",
            options: [{ applyToImports: true }],
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } },
            errors: [
                {
                    message: "Imports must go on a new line.",
                    type: "ObjectPattern",
                    line: 2,
                    column: 11
                }
            ]
        },
        {
            code: "import { x, y, z } from 'y';",
            output: "import {x, \ny, \nz } from 'y';",
            options: [{ applyToImports: true }],
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } },
            errors: [
                {
                    message: "Imports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 17
                },
                {
                    message: "Imports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 27
                }
            ]
        },
        {
            code: "import {x as val1,y as val2} from 'y';",
            output: "import {\nx as val1,\ny as val2\n} from 'y';",
            options: [{ applyToImports: true }],
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } },
            errors: [
                {
                    message: "Imports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 2,
                    column: 11
                }
            ]
        },
        {
            code: "import {\nx,y} from 'y';",
            output: "import {\nx,\ny} from 'y';",
            options: [{ applyToImports: true }],
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } },
            errors: [
                {
                    message: "Imports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 2,
                    column: 11
                },
                {
                    message: "Exports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 3,
                    column: 11
                }
            ]
        },
        {
            code: "import {\nx, \ny, z} from 'y';",
            output: "import {\nx,\ny,\nz} from 'y';",
            options: [{ applyToImports: true }],
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } },
            errors: [
                {
                    message: "Imports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 17
                }
            ]
        },
        {
            code: "import {x,y} from 'y';",
            output: "import {x,\ny} from 'y';",
            options: [{ applyToImports: true }],
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { destructuring: true, modules: true } },
            errors: [
                {
                    message: "Imports must go on a new line.",
                    type: "ImportDeclaration",
                    line: 1,
                    column: 17
                }
            ]
        }
    ]
});
