class ApplicationServiceSerializer
  include FastJsonapi::ObjectSerializer
  attributes :application_id, :service_id
end
