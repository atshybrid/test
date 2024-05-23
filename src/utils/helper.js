export const disableScrollPlugin = () => {
    const renderViewer = (props) => {
        const { slot } = props;

        if (slot.subSlot && slot.subSlot.attrs && slot.subSlot.attrs.style) {
            slot.subSlot.attrs.style = Object.assign({}, slot.subSlot.attrs.style, {
                // Disable scrolling in the pages container
                overflowX: 'hidden',  // Disable horizontal scrolling
                overflowY: 'auto',    // Ensure vertical scrolling is enabled
            });
        }

        return slot;
    };

    return {
        renderViewer,
    };
};