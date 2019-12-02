/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as TypeMoq from 'typemoq';
const figures = require('figures');
import VscodeWrapper from '../src/controllers/vscodeWrapper';
import CheckboxPrompt from '../src/prompts/checkbox';

suite('Test Checkbox prompt', () => {

    test('Test checkbox prompt with simple question', () => {
        let question = {
            choices: [{ name: 'test1', checked: true }, { name: 'test2', checked: false }]
        };
        let vscodeWrapper = TypeMoq.Mock.ofType(VscodeWrapper, TypeMoq.MockBehavior.Loose);
        vscodeWrapper.setup(v => v.showQuickPickStrings(TypeMoq.It.isAny(),
            TypeMoq.It.isAny())).returns(() => Promise.resolve('test1'));
        let checkbox = new CheckboxPrompt(question, vscodeWrapper.object);
        checkbox.render();
        vscodeWrapper.verify(v => v.showQuickPickStrings(TypeMoq.It.isAny(),
            TypeMoq.It.isAny()), TypeMoq.Times.once());
    });

    test('Test Checkbox prompt with error', () => {
        let question = {
            choices: [{ name: 'test1', checked: true }, { name: 'test2', checked: false }]
        };
        let vscodeWrapper = TypeMoq.Mock.ofType(VscodeWrapper, TypeMoq.MockBehavior.Loose);
        vscodeWrapper.setup(v => v.showQuickPickStrings(TypeMoq.It.isAny(),
            TypeMoq.It.isAny())).returns(() => Promise.resolve(undefined));
        let checkbox = new CheckboxPrompt(question, vscodeWrapper.object);
        checkbox.render();
        vscodeWrapper.verify(v => v.showQuickPickStrings(TypeMoq.It.isAny(),
            TypeMoq.It.isAny()), TypeMoq.Times.once());
    });

    test('Test Checkbox prompt with checked answer', () => {
        let question = {
            choices: [{ name: 'test1', checked: true }, { name: 'test2', checked: false }]
        };
        let vscodeWrapper = TypeMoq.Mock.ofType(VscodeWrapper, TypeMoq.MockBehavior.Loose);
        vscodeWrapper.setup(v => v.showQuickPickStrings(TypeMoq.It.isAny(),
            TypeMoq.It.isAny())).returns(() => Promise.resolve(figures.tick));
        let checkbox = new CheckboxPrompt(question, vscodeWrapper.object);
        checkbox.render();
        vscodeWrapper.verify(v => v.showQuickPickStrings(TypeMoq.It.isAny(),
            TypeMoq.It.isAny()), TypeMoq.Times.once());
    });
});
