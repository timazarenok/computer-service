class CreateMasters < ActiveRecord::Migration[6.0]
  def change
    create_table :masters do |t|
      t.string :name
      t.string :telephone

      t.timestamps
    end
  end
end
