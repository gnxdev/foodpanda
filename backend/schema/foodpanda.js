// Sequelize unified migration for multiple schemas

export const up_orders_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('orders', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: Sequelize.TEXT,
    code: Sequelize.TEXT,
    cus_email: Sequelize.TEXT,
    cus_first_name: Sequelize.TEXT,
    cus_last_name: Sequelize.TEXT,
    cus_phone: Sequelize.TEXT,
    cus_flag: Sequelize.TEXT,
    grand_total: Sequelize.TEXT,
    pay_restaurant: Sequelize.TEXT,
    rider_tip: Sequelize.TEXT,
    vat_total: Sequelize.TEXT,
    total_net: Sequelize.TEXT,
    collect_from_customer: Sequelize.TEXT,
    payment_type: Sequelize.TEXT,
    payment_status: Sequelize.TEXT,
    expedition_type: Sequelize.TEXT,
    expected_delivery_time: Sequelize.DATE,
    express_delivery: Sequelize.TINYINT,
    rider_pickup_time: Sequelize.DATE,
    pickup_time: Sequelize.DATE,
    pickup_code: Sequelize.TEXT,
    postcode: Sequelize.TEXT,
    city: Sequelize.TEXT,
    street: Sequelize.TEXT,
    number: Sequelize.TEXT,
    building: Sequelize.TEXT,
    company: Sequelize.TEXT,
    delivery_area: Sequelize.TEXT,
    delivery_instructions: Sequelize.TEXT,
    delivery_main_area: Sequelize.TEXT,
    entrance: Sequelize.TEXT,
    flat_number: Sequelize.TEXT,
    floor: Sequelize.TEXT,
    intercom: Sequelize.TEXT,
    latitude: Sequelize.STRING,
    longitude: Sequelize.STRING,
    comments: Sequelize.TEXT,
    country_code: Sequelize.STRING(10),
    currency_symbol: Sequelize.STRING(10),
    platform: Sequelize.STRING(50),
    platform_key: Sequelize.STRING(50),
    invoice_carrier_type: Sequelize.TEXT,
    invoice_carrier_value: Sequelize.TEXT,
    corporate_tax: Sequelize.TEXT,
    test: Sequelize.TINYINT,
    short_code: Sequelize.TEXT,
    platform_restaurant_id: Sequelize.TEXT,
    accepted_url: Sequelize.TEXT,
    rejected_url: Sequelize.TEXT,
    picked_up: Sequelize.TEXT,
    prepared_url: Sequelize.TEXT,
    expire_at: Sequelize.DATE,
    raw_payload: Sequelize.JSON,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    engine: 'InnoDB',
  });
};

export const down_orders_v2 = async (queryInterface) => {
  await queryInterface.dropTable('orders');
};

export const up_delivery_fee_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("delivery_fee", {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    value: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  await queryInterface.addIndex("delivery_fee", ["order_id"], {
    name: "fk_delivery_fee_orders1_idx",
  });
};

export const down_delivery_fee_v2 = async (queryInterface) => {
  await queryInterface.dropTable("delivery_fee");
};

export const up_order_discounts_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('order_discounts', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  await queryInterface.addIndex('order_discounts', ['order_id'], {
    name: 'fk_order_discounts_orders1_idx',
  });
};

export const down_order_discounts_v2 = async (queryInterface) => {
  await queryInterface.dropTable('order_discounts');
};

export const up_orderline_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('orderline', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    product_id: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    category_name: Sequelize.STRING(100),
    name: Sequelize.STRING(255),
    paid_price: Sequelize.STRING(40),
    quantity: Sequelize.STRING(40),
    remote_code: Sequelize.STRING(100),
    unit_price: Sequelize.STRING(40),
    vat_total: Sequelize.STRING(40),
    comment: Sequelize.TEXT,
    variation_name: Sequelize.STRING(100),
    item_unavailability_handling: Sequelize.STRING(100),
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  });

  await queryInterface.addIndex('orderline', ['order_id'], {
    name: 'fk_orderline_orders1_idx',
  });
};

export const down_orderline_v2 = async (queryInterface) => {
  await queryInterface.dropTable('orderline');
};

export const up_orderline_discount_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('orderline_discount', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    orderline_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'orderline',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  await queryInterface.addIndex('orderline_discount', ['orderline_id'], {
    name: 'fk_orderline_discount_orderline1_idx',
  });
};

export const down_orderline_discount_v2 = async (queryInterface) => {
  await queryInterface.dropTable('orderline_discount');
};

export const up_orderline_toppings_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('orderline_toppings', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    orderline_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'orderline',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    parent_topping_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'orderline_toppings',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    topping_id: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    name: Sequelize.STRING(100),
    type: Sequelize.STRING(100),
    price: Sequelize.STRING(40),
    quantity: Sequelize.INTEGER,
    remote_code: Sequelize.STRING(100),
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  });

  await queryInterface.addIndex('orderline_toppings', ['parent_topping_id'], {
    name: 'fk_orderline_toppings_orderline_toppings1_idx',
  });
  await queryInterface.addIndex('orderline_toppings', ['orderline_id'], {
    name: 'fk_orderline_toppings_orderline1_idx',
  });
};

export const down_orderline_toppings_v2 = async (queryInterface) => {
  await queryInterface.dropTable('orderline_toppings');
};


export const up_toppings_discount_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('toppings_discount', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    orderline_topping_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'orderline_toppings',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  await queryInterface.addIndex('toppings_discount', ['orderline_topping_id'], {
    name: 'fk_toppings_discount_orderline_toppings1_idx',
  });
};

export const down_toppings_discount_v2 = async (queryInterface) => {
  await queryInterface.dropTable('toppings_discount');
};



export const up_sponsorships_v2 = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("sponsorships", {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_discount_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "order_discounts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    },
    orderline_discount_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "orderline_discount",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    },
    toppings_discount_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "toppings_discount",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  await queryInterface.addIndex("sponsorships", ["order_discount_id"], {
    name: "fk_sponsorships_order_discounts1_idx",
  });
  await queryInterface.addIndex("sponsorships", ["orderline_discount_id"], {
    name: "fk_sponsorships_orderline_discount1_idx",
  });
  await queryInterface.addIndex("sponsorships", ["toppings_discount_id"], {
    name: "fk_sponsorships_toppings_discount1_idx",
  });
};

export const down_sponsorships_v2 = async (queryInterface) => {
  await queryInterface.dropTable("sponsorships");
};
