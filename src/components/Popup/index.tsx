import { ContainerPopup } from "./styles";

type PropsPopup = {
    children?: React.ReactNode;
};

export function Popup({children}: PropsPopup) {

    return (
        <>
            <ContainerPopup>
                {children}
            </ContainerPopup>
        </>
    )
}