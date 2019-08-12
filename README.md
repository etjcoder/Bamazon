# Bamazon

# This is the Bamazon app. This is a mockup of a customer/manager/supervisor inventory tracking interface
(( FULL DEMO: https://share.getcloudapp.com/DOujxrgZ))

# Node customerview.js
((Video Demo : https://share.getcloudapp.com/4gu59rEx ))
This mode allows the user to call upon the database to obtain the list of items available.

It then loops through the items in the table and lets the user choose which item they'd like to buy.

Then it asks the user how many of the product they'd like to obtain.

It then provides the user with the total cost based on the price of the item and how many of said item they'd like to buy.

If there is not enough items in the inventoty, it will alert the customer


# Node managerview.js
((Video Demo : https://share.getcloudapp.com/E0ulny0x ))

This mode allows the user to call upon the database to obtain the list of items available.

It provides a list of options for the manager to do including:
    - View Products
    - View Products with low inventory
    - Add quantity to existing inventory
    - Add new item

The hardest part of this example was providing a method for the new item to automatically assign a new ID. I did not want to use the AUTO INCREMENT mysql function, partially because it would cause a complete reworking of the code, so I implemented a system that takes the length of the existing array of objects of the table in mySQL

I also added a functionality that loops through the departments table and lets the manager add an item to an existing department, versus typing in the new department which could cause errors

# node supervisorview.js
((Video Gemo : https://share.getcloudapp.com/JruX6odW))

This mode allows the user to view the departments table. 

The departments table provides the existing departments, a new id for these departments, the over head costs, the department sales, and the net profits.

The net profits are calculated by taking the table's gross profits - overhead costs. It is calculated in realtime. 

This also allows the user to add a new department. This function assigns an automatic incremental ID, using the same methodology created in managerview.js. Once the supervisor adds the new department, it updates the database and syncs with all of the other options. 

For example if the supervisor adds a department, the manager can add an item assigned to the new department via a list, and then the customer can buy the item that the manager creates. All synced perfectly.
