'use strict';

const userForm = new UserForm();
userForm.loginFormCallback = function (data) {
    ApiConnector.login(data, callback => {
        if (!callback.success) {
            this.setLoginErrorMessage('Ошибка при вводе данных или данного пользователя не существует!');
        } else {
            location.reload();
        }
    })
}

userForm.registerFormCallback = function (data) {
    ApiConnector.register(data, callback => {
        if (!callback.success) {
            this.setRegisterErrorMessage('Введены некорректные данные');
        } else {
            location.reload();
        }
    })
}