import { ButtonCancel } from "./styles"

type PropsButton = {
    children?: React.ReactNode;
    onClick: () => void;
};

export function CancelButton({children, onClick}: PropsButton) {

    return (
        <>
            <ButtonCancel onClick={onClick}>{children}</ButtonCancel>
        </>
    )
}