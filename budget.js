angular.module('budgetApp', ['ngAnimate', 'ui.bootstrap'])
    .controller('BudgetController', ['$scope', function ($scope) {
        var budget = this,
            expensesChart;

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

        budget.autocompleteItems = function (expenses, field) {
            return _.keys(_.groupBy(expenses, field));
        };

        budget.refreshCharts = function (expenses) {
            var data = _.map(_.groupBy(expenses, "category"), function (mapItem, mapKey) {
                return {
                    name: mapKey,
                    y: _.reduce(mapItem, function (sum, reduceItem) {
                        return sum + parseInt(reduceItem.amount)
                    }, 0)
                }
            });
            expensesChart.series[0].setData(data);
        };

        $(document).ready(function () {
            var expensesChartContainer = $('#expensesChart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Expenses grouped by categories'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: "Part",
                    colorByPoint: true,
                    data: []
                }]
            });
            expensesChart = expensesChartContainer.highcharts();
            $scope.expenses = budget.expenses;
            budget.refreshCharts(budget.expenses);
            $scope.$watch('expenses', function (expenses) {
                budget.refreshCharts(expenses);
            }, true);
        });
    }]);