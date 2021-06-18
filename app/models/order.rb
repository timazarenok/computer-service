class Order < ApplicationRecord
  belongs_to :application, dependent: :destroy
  belongs_to :master
end
