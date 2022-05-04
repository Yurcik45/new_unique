import React, { useEffect } from 'react';
import * as d3 from "d3";
import './ReactD3Pie.sass'

function ReactD3Pie(props) {
    const {
        data,
        outerRadius,
        innerRadius,
    } = props;



    // set the basic dimensions
    const width = 2 * outerRadius + 75;
    const height = 2 * outerRadius + 100;

    // the function is started when data is received

    for (let i = 0; i < data.length; i++) {
        if (data[i].value === 0) {
            data[i].value = '1'
            data[i].text = '0'
        } else {
            data[i].text = data[i].value
        }
    }
    useEffect(() => {
        {
            // remove the old svg
            d3.select('#pie-container')
                .select('svg')
                .remove();
            d3.select(`#${props.pieId}`)
                .select('svg')
                .remove();

            // set the location of the arcs
            const arcGenerator = d3
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            const hoverGenerator = d3
                .arc()
                .innerRadius(120)
                .outerRadius(153);

            // set the location for the background values
            const testGenerator = d3
                .arc()
                .innerRadius(135)
                .outerRadius(175);

            // generate a circle
            const pieGenerator = d3
                .pie()
                .padAngle(0)
                .value((d) => d.value)
                .sort(null);


            // create new svg of circle
            const svg = d3
                .select(`#${props.pieId}`)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('position', 'relative')
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            // create custom color scheme
            const myColor = d3.scaleOrdinal().domain(data)
                .range(['#90001A' , '#840090' , '#580080' , '#007890']);

            // select arcs
            const arc = svg
                .selectAll()
                .data(pieGenerator(data))
                .enter();

            // set coordinates for draw white background numbers path
            const tagD = "M -25, -2 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0";

            // create tooltip
            let div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("display", "none")
                .style("opacity", 0);


            // append arcs
            arc
                .append('path')
                .attr('d', arcGenerator)
                .style('fill', (_, i) => myColor(i))
                .attr('id', 'testId')
                // show the values when hovering over the sector
                .on("mouseover", function(d) {
                    d3.select(this).transition()
                        .duration(500)
                        .attr('d', hoverGenerator)
                        .style('opacity', '0.93');
                    div.transition()
                        .duration(200)
                        .style("display", "flex")
                        .style("opacity", 1)
                        .style("color", d.target.__data__.data.dotsColor);
                    div.html(
                        d.target.__data__.data.label + ' : ' + d.target.__data__.data.text
                    )
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY - 28) + "px")
                })
                // remove the values when hovering over the sector
                .on("mouseout", function() {
                    d3.select(this).transition()
                        .duration(300)
                        .attr('d', arcGenerator)
                        .style('opacity', '1');
                    div.transition()
                        .duration(500)
                        .style("display", "none")
                        .style("opacity", 0);
                })
                // show the values when click the sector
                .on('click', d => {
                    return console.log('on click', d.target.__data__.data.label)
                });


            // generate need background
            arc
                .append('path')
                .attr('d', tagD)
                .style('fill', '#fff')
                .attr('transform', (d) => {
                    const [x, y] = testGenerator.centroid(d);
                    return `translate(${x}, ${y})`;
                })

            // append item values on text
            arc
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .text((d) => d.data.text)
                .style('fill', (_, i) => myColor(i))
                .attr('class', 'pie_text')
                .attr('transform', (d) => {
                    const [x, y] = testGenerator.centroid(d);
                    return `translate(${x}, ${y})`;
                });
        }

    }, [data]);

    return (
        <div className="DonutsChart">
            <div className="pie_block">
                {/* set ID in main pie div */}
                <div id={props?.pieId ? props.pieId : "standardId"}/>
                {/* set text on center ( common / relevant ) */}
                <div className="pie_d_center_content">
                    <div className="pie_d_center_text">{props.centerText}</div>
                    <div className="pie_d_center_description">{props.descriptionText}</div>
                </div>
            </div>

            {/* add bottom legends */}
            <div className="sliceLegends">
                {
                    props.data.map((l, id) => {
                        // let styles = {background: l.dotsColor}
                        return (
                            <div key={id} className="sliceItems">
                                <div className="sliceDots">
                                    <div style={{background: l.dotsColor}} className="sliceDot"/>
                                </div>
                                <div className="sliceText">
                                    <div className="sliceLabelText"/>
                                    <div className="sliceDescriptionText"/>
                                    {l.label}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ReactD3Pie;