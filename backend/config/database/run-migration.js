import { Sequelize } from 'sequelize';
import config from '../config.js';

// Import only the functions for the intended schema
import {
    up_orders_v2,
    up_delivery_fee_v2,
    up_order_discounts_v2,
    up_orderline_v2,
    up_orderline_discount_v2,
    up_orderline_toppings_v2,
    up_toppings_discount_v2,
    up_sponsorships_v2,
} from '../schema/foodpanda.js';

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
});

const queryInterface = sequelize.getQueryInterface();

async function migrate() {
    try {
        await sequelize.authenticate();
        // Run selected migrations
        await up_orders_v2(queryInterface, Sequelize); // Orders Table
        await up_delivery_fee_v2(queryInterface, Sequelize); // Delivery Fee Table
        await up_order_discounts_v2(queryInterface, Sequelize); // Order Discounts Table
        await up_orderline_v2(queryInterface, Sequelize); // Orderline Table
        await up_orderline_discount_v2(queryInterface, Sequelize); // Orderline Discounts Table
        await up_orderline_toppings_v2(queryInterface, Sequelize); // Orderline Toppings Table
        await up_toppings_discount_v2(queryInterface, Sequelize); // Toppings Discounts Table
        await up_sponsorships_v2(queryInterface, Sequelize); // Sponsorships Table

        console.log('Migration completed successfully.');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await sequelize.close();
    }
}

// Run the migration function
migrate();
