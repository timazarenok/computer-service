class Service < ApplicationRecord
  has_many :application_services
  has_many :applications, through: :application_services
end
