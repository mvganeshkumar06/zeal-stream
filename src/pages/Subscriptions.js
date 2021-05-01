import React from "react";
import { Container, Text } from "@zeal-ui/core";

const Subscriptions = () => {
    const styles = `
        width: 100%;
        margin: 5rem 0rem;
    `;
    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">Subscriptions</Text>
        </Container>
    );
};

export default Subscriptions;
