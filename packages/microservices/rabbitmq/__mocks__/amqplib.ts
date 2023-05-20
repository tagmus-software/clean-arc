const mockChannel = () => {
    return jest.fn();
};

const mockConnect = () => {
    return {
        createChannel: jest.fn(mockChannel),
    };
};
export default {
    connect: jest.fn(mockConnect),
};
