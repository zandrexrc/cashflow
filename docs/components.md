# Components
- [ActivityGraph](#activitygraph)
- [CategoriesGraph](#categoriesgraph)
- [FilterDialog](#filterdialog)
- [Statistics](#statistics)
- [Navbar](#navbar)
- [OverviewCards](#overviewcards)
- [PageContainer](#pagecontainer)
- [Table](#table)
- [TableFooter](#tablefooter)


# ActivityGraph
Displays a line chart showing daily income and expenses.   

PropTypes:
| Name       | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| width      | string | yes      | Chart width                                    |
| height     | string | yes      | Chart height                                   |
| data       | object | yes      | Contains the datasets and labels for the chart |
| xAxisLabel | string | yes      | Label for the x axis                           |
| yAxisLabel | string | yes      | Label for the y axis                           |

The *data* prop is generated using the *createActivityGraphData* method in *src/utils/graphUtils.js*.


# CategoriesGraph
Displays a pie chart showing the number of transactions within each category. 

PropTypes:
| Name   | Type   | Required | Description                                    |
| ------ | ------ | -------- | ---------------------------------------------- |
| width  | string | yes      | Chart width                                    |
| height | string | yes      | Chart height                                   |
| data   | object | yes      | Contains the datasets and labels for the chart |

The *data* prop is generated using the *createCategoryGraphData* method in *src/utils/graphUtils.js*.


# FilterDialog
A modal window that contains a form for filtering transactions.

PropTypes:
| Name                    | Type          | Required | Description |
| ----------------------- | ------------- | -------- | ----------- |
| isOpen                  | boolean       | yes      | *true* if the dialog is visible, *false* otherwise |
| closeDialog             | function      | yes      | Callback function that fires when the dialog closes |
| filters                 | object        | yes      | The initial filters for the dialog |
| setFilters              | function      | yes      | Function for applying the selected filters |
| accounts                | Array<Object> | yes      | A list of all the accounts |
| categories              | Array<String> | yes      | A list of all the categories |
| transactionYears        | Array<Number> | yes      | A list of all the years the transactions are logged |
| enableYearLongDateRange | boolean       | no       | *true* to enable the option to show all transactions in a given year, *false* if only monthly transactions are to be displayed |

The *transactionYears* prop is generated using the *getTransactionYears* method in *src/utils/transactionUtils.js*.   
Sample filters:
```javascript
{
    account: 'All',
    category: 'All',
    date: {
        month: 'All',
        year: 2020,
    }
}
```


# Navbar
A sidebar with navigation links for the different pages.

PropTypes:
| Name            | Type     | Required | Description                             |
| --------------- | -------- | -------- | --------------------------------------- |
| activeWindow    | number   | yes      | ID of the currently visible page/window |
| setActiveWindow | function | yes      | Function for changing the active window |

The IDs, as well as the icons and labels, of the different pages are defined in *src/components/Navbar.js*.


# OverviewCards
Card-like components used in the Overview page.

## TitleCard
Card for displaying the title   

PropTypes:
| Name  | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| title | string | yes      | The content of the card |

## GraphCard
Card for displaying a graph   

PropTypes:
| Name     | Type   | Required | Description               |
| -------- | ------ | -------- | ------------------------- |
| title    | string | yes      | The title of the card     |
| children | node   | yes      | The graph to be displayed |

## TextCard
Card for displaying basic information   

PropTypes:
| Name   | Type          | Required | Description                           |
| ------ | ------------- | -------- | ------------------------------------- |
| title  | string        | yes      | The title of the card                 |
| action | function      | yes      | Callback function for the card button |
| data   | Array<Object> | yes      | The data to be displayed              |

Sample *data*:
```javascript
[
    {
        label: "Income", 
        value: "5000.00"
    },
    {
        label: "Expenses", 
        value: "1999.99"
    },
    {
        label: "Net income", 
        value: "3000.01"
    }
]
```


# PageContainer
Container for the different pages. 

PropTypes:
| Name         | Type   | Required | Description                                  |
| ------------ | ------ | -------- | -------------------------------------------- |
| activeWindow | number | yes      | ID of the currently visible page/window      |
| error        | string | no       | Error message in the event of a system error |

The IDs of the different pages are defined in *src/components/Navbar.js*.


# Table
A table for displaying data.   

PropTypes:
| Name              | Type          | Required | Description                                     |
| ----------------- | ------------- | -------- | ----------------------------------------------- |
| title             | string        | yes      | Table title                                     |
| columns           | Array<Object> | yes      | Table columns                                   |
| data              | Array<Object> | yes      | Table data                                      |
| addData           | function      | yes      | Function for adding new data to the table       |
| editData          | function      | yes      | Function for editing existing data in the table |
| deleteData        | function      | yes      | Function for deleting data in the table         |
| additionalActions | Array<Object> | no       | Additional table actions (e.g. filtering)       |

More documentation about the columns, data and actions on [material-table](https://material-table.com/).


# TableFooter
For displaying various statistics of the Table data.

PropTypes:
| Name     | Type          | Required | Description                                                |
| -------- | ------------- | -------- | ---------------------------------------------------------- |
| data     | Array<Object> | yes      | The data to be displayed                                   |
| filters  | object        | no       | The filters used on the data                               |
| accounts | Array<Object> | no       | A list of all accounts (needed to display account filters) |

Sample data:
```javascript
[
    {
        label: "Total income",
        value: "5000.00",
        color: "primary"
    },
    {
        label: "Total expenses",
        value: "1999.99",
        color: "error"
    },
    {
        label: "Net income",
        value: "3000.01",
        color: "textPrimary"
    }
]
```