import React from "react";
import { Container, Text } from "@zeal-ui/core";

const Podcast = () => {
    const styles = `
        margin: 8rem 0rem;
    `;

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">Podcast</Text>
        </Container>
    );
};

export default Podcast;
