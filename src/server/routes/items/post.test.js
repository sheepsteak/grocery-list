import { postItem } from "./post";

describe("api POST /", () => {
  it("adds and returns new item as JSON", () => {
    const req = {
      body: { description: "Milk", isComplete: false },
      database: {
        add: jest.fn(item => ({ ...item, id: 2 })),
      },
    };

    const res = {
      json: jest.fn(),
    };

    const result = postItem(req, res);

    expect(req.database.add).toBeCalledTimes(1);
    expect(req.database.add).toBeCalledWith({
      description: "Milk",
      isComplete: false,
    });
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      description: "Milk",
      id: 2,
      isComplete: false,
    });
  });
});
