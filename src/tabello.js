import React, {Component} from "react";
import PropTypes from 'prop-types';
import {tabelloStyles} from "./tabelloStyles";

class Tabello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        this.parseAndSetData();
    }

    componentDidUpdate(prevProps) {
        // Reparse and set data if the prop changes
        if (prevProps.tableData !== this.props.tableData) {
            this.parseAndSetData();
        }
    }

    parseAndSetData() {
        const { tableData } = this.props;

        try {
            // Parse and transform the data
            const parsedData = JSON.parse(tableData);
            const transformedItems = Object.keys(parsedData.Platzierung).map((key) => ({
                Platzierung: parsedData.Platzierung[key],
                Name: parsedData.Name[key],
                Punkte: parsedData.Punkte[key],
            }));
            this.setState({ items: transformedItems });
        } catch (error) {
            console.error("Error parsing table data:", error);
        }
    }

    render() {
        const { items } = this.state;
        const { title } = this.props; // Access title from props

        return (
            <div style={tabelloStyles.container}>
                <h1 style={tabelloStyles.title}>{title}</h1> {/* Render title prop as heading */}
                <table style={tabelloStyles.table}>
                    <thead>
                    <tr>
                        <th style={tabelloStyles.th}>Platzierung</th>
                        <th style={tabelloStyles.th}>Name</th>
                        <th style={tabelloStyles.th}>Punkte</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <tr key={index} style={tabelloStyles.tr}>
                                <td style={tabelloStyles.td}>{item.Platzierung}</td>
                                <td style={tabelloStyles.td}>{item.Name}</td>
                                <td style={tabelloStyles.td}>{item.Punkte}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={tabelloStyles.noData}>No items found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

// Define prop types
Tabello.propTypes = {
    tableData: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, // Define title as a required prop
};

// Default prop values (optional)
Tabello.defaultProps = {
    tableData: JSON.stringify({
        Platzierung: {},
        Name: {},
        Punkte: {},
    }),
};

export default Tabello;
