class Application < ApplicationRecord
  has_many :application_services
  has_many :services, through: :application_services
end
