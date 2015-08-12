angular.module('budgetApp', [])
    .controller('BudgetController', function() {
        var budget = this;

        budget.expenses = [
            {
                "date": "11.08.2015",
                "title": "Быстроном",
                "amount": 1000,
                "category": "Еда"
            }
        ];

        budget.add = function () {
            this.expenses.push({});
        };

        budget.remove = function (index) {
            this.expenses.splice(index, 1);
        };
    });