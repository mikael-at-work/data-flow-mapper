# Data-Flow-Mapper

## Purpose
The Data Flow Mapper provides a **single, versioned, and visual source of truth** for how data flows across systems.

It aligns **IT architecture and business processes** by combining:
- Application landscape
- Data objects
- Integration patterns (API, Event, ETL)

The goal is to **reduce complexity, improve ownership clarity, and support better decision-making** across initiatives.

---

## Scope

The repository captures:

- End-to-end data flows (e.g. Product → PIM → CMS)
- Integration patterns (API / Event / ETL)
- System interactions via the integration layer
- Business and IT ownership per flow
- Current and target state mappings

---

## How it works

### 1. Model (Source of Truth)
Flows are defined as structured files (YAML) and versioned in GitHub.

Example:

```yaml
flow:
  name: "Product Data to Website"
  source: "ERP"
  target: "CMS"
  via: "Integration Layer"
  type: "event"
  data:
    - product_id
    - attributes
    - pricing
  owner:
    business: "Product Management"
    it: "Integration Team"
