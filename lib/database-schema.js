const branches = ["Perth City", "Subiaco", "South Perth"];
const services = [
  "General dentistry", "Cleaning & hygiene", "Tooth-coloured fillings",
  "Root canal care", "Tooth extractions", "Braces & clear aligners",
  "Teeth whitening", "Dental implants", "Veneers", "Children's dentistry",
  "Emergency dental care"
];
const appointmentStatuses = ["new", "contacted", "confirmed", "declined", "completed"];

export const collectionDefinitions = [
  {
    name: "appointment_requests",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "branch", "service", "preferredDate", "preferredTime", "status", "consent", "consentRecordedAt", "source", "createdAt", "updatedAt"],
        properties: {
          _id: { bsonType: "objectId" },
          name: { bsonType: "string", minLength: 2, maxLength: 100 },
          email: { bsonType: "string", maxLength: 254, pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
          phone: { bsonType: "string", maxLength: 30 },
          branch: { enum: branches },
          service: { enum: services },
          preferredDate: { bsonType: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
          preferredTime: { enum: ["Any time", "Morning", "Afternoon"] },
          status: { enum: appointmentStatuses },
          consent: { enum: [true] },
          consentRecordedAt: { bsonType: "date" },
          source: { enum: ["public-website"] },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" },
          updatedBy: { bsonType: "string", maxLength: 254 }
        },
        additionalProperties: true
      }
    },
    indexes: [
      { key: { createdAt: -1 }, options: { name: "appointment_requests_created_desc" } },
      { key: { status: 1, createdAt: -1 }, options: { name: "appointment_requests_status_created" } },
      { key: { email: 1, createdAt: -1 }, options: { name: "appointment_requests_email_created" } }
    ]
  },
  {
    name: "admin_audit_logs",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["action", "createdAt"],
        properties: {
          _id: { bsonType: "objectId" },
          action: { enum: ["login_failed", "login_success", "appointment_status_updated"] },
          email: { bsonType: "string", maxLength: 254 },
          appointmentId: { bsonType: "string", pattern: "^[a-fA-F0-9]{24}$" },
          status: { enum: appointmentStatuses },
          actor: { bsonType: "string", maxLength: 254 },
          createdAt: { bsonType: "date" }
        },
        additionalProperties: true
      }
    },
    indexes: [
      { key: { createdAt: -1 }, options: { name: "admin_audit_logs_created_desc" } },
      { key: { action: 1, createdAt: -1 }, options: { name: "admin_audit_logs_action_created" } }
    ]
  },
  {
    name: "admin_login_attempts",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["count", "expiresAt", "updatedAt"],
        properties: {
          _id: { bsonType: "string", maxLength: 64 },
          count: { bsonType: ["int", "long", "double"], minimum: 1 },
          expiresAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        },
        additionalProperties: true
      }
    },
    indexes: [
      { key: { expiresAt: 1 }, options: { name: "admin_login_attempts_expiry", expireAfterSeconds: 0 } }
    ]
  }
];
