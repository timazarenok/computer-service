class CreateApplicationServices < ActiveRecord::Migration[6.0]
  def change
    create_table :application_services do |t|
      t.belongs_to :service, null: false, foreign_key: true
      t.belongs_to :application, null: false, foreign_key: true

      t.timestamps
    end
  end
end
