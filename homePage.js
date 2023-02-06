'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const currencyFetch = function() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

currencyFetch();
setInterval(currencyFetch, 60000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Деньги успешно переведены!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод прошёл успешно');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites((response) => {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
});

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, 'Пользователь успешно добавлен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, 'Пользователь успешно удалён');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}