DROP TABLE IF EXISTS RangeAllocations;
CREATE TABLE IF NOT EXISTS RangeAllocations (
    RangeId INTEGER PRIMARY KEY AUTOINCREMENT,
    RangeCreatedAt DATE DEFAULT CURRENT_TIMESTAMP
);