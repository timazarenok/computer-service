class OrderSerializer
  include FastJsonapi::ObjectSerializer
  attributes :result, :days, :master_id, :application_id
end
