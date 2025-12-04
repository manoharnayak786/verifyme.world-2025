import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../components/ui/badge";
import { StatCard } from "../components/ui/StatCard";
import { GlassCard } from "../components/ui/GlassCard";

describe("UI Components", () => {
  it("renders Badge with correct content", () => {
    render(<Badge>Verified</Badge>);
    expect(screen.getByText("Verified")).toBeInTheDocument();
  });

  it("renders StatCard with title and value", () => {
    render(<StatCard title="Total Users" value="1,234" />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("renders GlassCard with children", () => {
    render(
      <GlassCard>
        <div>Glass Content</div>
      </GlassCard>
    );
    expect(screen.getByText("Glass Content")).toBeInTheDocument();
  });
});
