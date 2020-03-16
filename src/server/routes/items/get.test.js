import { getItems } from "./get";

describe("api GET /", () => {
  it("returns items as JSON", () => {
    const req = {
      database: {
        getAll: () => [{ description: "Milk", id: 1 }],
      },
    };

    const res = {
      json: jest.fn(),
    };

    const result = getItems(req, res);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith([{ description: "Milk", id: 1 }]);
  });
});
