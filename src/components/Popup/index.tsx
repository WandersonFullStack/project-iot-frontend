import { ContainerPopup, PopupForm } from "./styles";

type PropsPopup = {
    children?: React.ReactNode;
};

export function Popup({children}: PropsPopup) {

    return (
        <>
            <ContainerPopup>
                <PopupForm>
                    {children}
                </PopupForm>
            </ContainerPopup>
        </>
    )
}