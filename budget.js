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

        budget.add = function (list) {
            list.push({});
        };

        budget.remove = function (list, index) {
            list.splice(index, 1);
        };

        budget.autocompleteItems = function (list, field, value) {
            var all = _.filter(_.keys(_.groupBy(list, field)), function (item) {
                return (item != "undefined" && item != value);
            });
            if (!value || !value.length) {
                return all;
            } else {
                return _.filter(all, function (item) {
                    var re = new RegExp(value, 'gi');
                    return item.match(re);
                });
            }
        };

        budget.refreshCharts = function (list) {
            var data = _.map(_.groupBy(list, "category"), function (mapItem, mapKey) {
                return {
                    name: mapKey,
                    y: _.reduce(mapItem, function (sum, reduceItem) {
                        return sum + parseInt(reduceItem.amount)
                    }, 0)
                }
            });
            expensesChart.series[0].setData(data);
        };

        // Charts drawing

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