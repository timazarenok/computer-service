class CreateApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :applications do |t|
      t.string :name
      t.string :description
      t.string :phone
      t.references :service, null: false, foreign_key: true
      t.string :firstname
      t.date :date

      t.timestamps
    end
  end
end
