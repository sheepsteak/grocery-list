import { createDatabase } from "./database";

describe("database", () => {
  it("returns no items after creation", () => {
    const database = createDatabase();

    const result = database.getAll();

    expect(result).toEqual([]);
  });

  it("returns initial items after creation", () => {
    const database = createDatabase([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread",
        id: 2,
      },
    ]);

    const result = database.getAll();

    expect(result).toEqual([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread",
        id: 2,
      },
    ]);
  });

  it("generates an ID for a new item based on last item", () => {
    const database = createDatabase([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread",
        id: 100,
      },
    ]);

    database.add({
      description: "All the toilet paper",
    });
    const result = database.getAll();

    expect(result).toEqual([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread",
        id: 100,
      },
      {
        description: "All the toilet paper",
        id: 101,
      },
    ]);
  });

  it("returns newly added item", () => {
    const database = createDatabase();

    const result = database.add({
      description: "All the toilet paper",
    });

    expect(result).toEqual({
      description: "All the toilet paper",
      id: 1,
    });
  });

  it("updates an item", () => {
    const database = createDatabase([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread",
        id: 2,
      },
    ]);

    database.update({
      description: "Bread rolls",
      id: 2,
    });

    const result = database.getAll();

    expect(result).toEqual([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread rolls",
        id: 2,
      },
    ]);
  });

  it("removes an item", () => {
    const database = createDatabase([
      {
        description: "Milk",
        id: 1,
      },
      {
        description: "Bread",
        id: 2,
      },
    ]);

    database.delete(2);

    const result = database.getAll();

    expect(result).toEqual([
      {
        description: "Milk",
        id: 1,
      },
    ]);
  });

  it("returns correct result after multiple operations", () => {
    const database = createDatabase();

    const item1 = database.add({
      description: "Milk",
    });
    const item2 = database.add({
      description: "Bread",
    });
    const item3 = database.add({
      description: "Eggs",
    });

    database.delete(item2.id);

    const item4 = database.add({
      description: "Biscuits",
    });

    const newItem1 = database.update({ ...item1, description: "Milk x 2" });

    const result = database.getAll();

    expect(result).toEqual([
      { description: "Milk x 2", id: 1 },
      { description: "Eggs", id: 3 },
      { description: "Biscuits", id: 4 },
    ]);
  });
});
