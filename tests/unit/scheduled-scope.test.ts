import { describe, expect, it } from "vitest";
import { scheduledWorkScope } from "#/server/scheduled/maintenance";

describe("scheduled work scope", () => {
	it("keeps the five-minute cron on recovery only", () => {
		expect(scheduledWorkScope("*/5 * * * *")).toBe("recovery");
	});

	it("keeps the hourly cron on heavy work only", () => {
		expect(scheduledWorkScope("0 * * * *")).toBe("heavy");
	});

	it("keeps bun and manual runs on the full path", () => {
		expect(scheduledWorkScope("* * * * *")).toBe("full");
		expect(scheduledWorkScope("manual")).toBe("full");
	});
});
