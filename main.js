import * as d3 from "d3";
import { sankey as d3Sankey, sankeyLinkHorizontal } from "d3-sankey";
import { data } from "./data.js";

// Setup
const container = document.getElementById("chart");
const width = container.clientWidth;
const height = 600;

// Color Scale - Professional Financial Palette
const color = d3.scaleOrdinal()
    .domain(["Source", "Hub", "Expense", "Savings", "Sub-Expense"])
    .range([
        "#60a5fa", // Light Blue (Income)
        "#94a3b8", // Slate (Flow Hub)
        "#f87171", // Muted Red (Expenses)
        "#34d399", // Emerald (Savings)
        "#818cf8"  // Indigo (Investments/Others)
    ]);

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto");

// Tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Sankey Generator
const sankey = d3Sankey()
    .nodeWidth(10) // Thinner nodes for formal look
    .nodePadding(24) // More space
    .extent([[1, 1], [width - 1, height - 6]]);

// Process Data
const { nodes, links } = sankey({
    nodes: data.nodes.map(d => Object.assign({}, d)),
    links: data.links.map(d => Object.assign({}, d))
});

// Define Gradients
const defs = svg.append("defs");

links.forEach((link, i) => {
    const gradientID = `gradient-${i}`;
    const gradient = defs.append("linearGradient")
        .attr("id", gradientID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", link.source.x1)
        .attr("x2", link.target.x0);

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(link.source.name));

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(link.target.name));
});

// Render Links
const link = svg.append("g")
    .attr("fill", "none")
    .selectAll("g")
    .data(links)
    .join("g")
    .attr("stroke-opacity", 0.3); // Start more subtle

link.append("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("stroke", (d, i) => `url(#gradient-${i})`)
    .attr("stroke-width", d => Math.max(1, d.width))
    .attr("class", "link")
    .on("mouseover", function (event, d) {
        d3.select(this).style("stroke-opacity", 0.8);
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<div style="font-weight:600;margin-bottom:4px;">${d.source.name} → ${d.target.name}</div><div>$${d.value.toLocaleString()}</div>`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function () {
        d3.select(this).style("stroke-opacity", 0.3);
        tooltip.transition().duration(200).style("opacity", 0);
    });

// Render Nodes
const node = svg.append("g")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => color(d.name))
    .attr("class", "node")
    .attr("rx", 2) // Slight rounded corners
    .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<div style="font-weight:600;margin-bottom:4px;">${d.name}</div><div>Value: $${d.value.toLocaleString()}</div>`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function () {
        tooltip.transition().duration(200).style("opacity", 0);
    });

// Node Labels
svg.append("g")
    .style("font", "12px sans-serif")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 8 : d.x0 - 8)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name)
    .style("fill", "var(--text-primary)")
    .style("font-weight", "500")
    .style("letter-spacing", "0.01em");
