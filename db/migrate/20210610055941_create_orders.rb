class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :application, null: false, foreign_key: true
      t.references :master, null: false, foreign_key: true
      t.decimal :result
      t.integer :days

      t.timestamps
    end
  end
end
