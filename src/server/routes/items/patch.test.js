import { patchItem } from "./patch";

describe("api PATCH /", () => {
  it("updates and returns item as JSON", () => {
    const req = {
      body: { isComplete: true },
      database: {
        getAll: () => [
          { description: "Milk", id: 1 },
          { description: "Bread", id: 2 },
          { description: "Eggs", id: 3 },
        ],
        update: jest.fn(),
      },
      params: {
        id: "2",
      },
    };

    const res = {
      json: jest.fn(),
    };

    const result = patchItem(req, res);

    expect(req.database.update).toBeCalledTimes(1);
    expect(req.database.update).toBeCalledWith({
      description: "Bread",
      id: 2,
      isComplete: true,
    });
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      description: "Bread",
      id: 2,
      isComplete: true,
    });
  });

  it("returns 404 if ID is not a number", () => {
    const req = {
      body: { isComplete: true },
      database: {
        getAll: () => [
          { description: "Milk", id: 1 },
          { description: "Bread", id: 2 },
          { description: "Eggs", id: 3 },
        ],
        update: jest.fn(),
      },
      params: {
        id: "oops",
      },
    };

    const res = {
      sendStatus: jest.fn(),
    };

    const result = patchItem(req, res);

    expect(res.sendStatus).toBeCalledWith(404);
  });

  it("returns 404 if ID is not a valid item", () => {
    const req = {
      body: { isComplete: true },
      database: {
        getAll: () => [
          { description: "Milk", id: 1 },
          { description: "Bread", id: 2 },
          { description: "Eggs", id: 3 },
        ],
        update: jest.fn(),
      },
      params: {
        id: "8",
      },
    };

    const res = {
      sendStatus: jest.fn(),
    };

    const result = patchItem(req, res);

    expect(res.sendStatus).toBeCalledWith(404);
  });
});
