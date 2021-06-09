class RemoveServiceFromApplication < ActiveRecord::Migration[6.0]
  def change
    remove_column :applications, :service_id
  end
end
