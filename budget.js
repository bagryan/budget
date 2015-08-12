angular.module('budgetApp', [])
    .controller('BudgetController', function() {
        var budget = this;

        budget.expenses = [
            {
                "date": "11.08.2015",
                "title": "Быстроном",
                "amount": 1000,
                "category": "Еда"
            },
            {
                "date": "11.08.2015",
                "title": "Бензин",
                "amount": 1500,
                "category": "Машина"
            },
            {
                "date": "12.08.2015",
                "title": "Быстроном",
                "amount": 500,
                "category": "Еда"
            },
            {
                "date": "12.08.2015",
                "title": "Спортзал",
                "amount": 1000,
                "category": "Здоровье"
            }
        ];

        budget.add = function () {
            this.expenses.push({});
        };

        budget.remove = function (index) {
            this.expenses.splice(index, 1);
        };
    });