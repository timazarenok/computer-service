class Application < ApplicationRecord
  has_many :application_services,  dependent: :destroy
  has_many :services, through: :application_services
  belongs_to :user
end
