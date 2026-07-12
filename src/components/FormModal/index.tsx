import { ContainerPopup } from "./styles";

type PropsPopup = {
    children?: React.ReactNode;
};

export function FormModal({children}: PropsPopup) {

    return (
        <>
            <ContainerPopup>
                {children}
            </ContainerPopup>
        </>
    )
}