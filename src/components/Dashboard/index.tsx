import { useState, useEffect } from "react";
import { 
    Plus, 
    GalleryVerticalEnd, 
    Cpu, 
    ChevronUp, 
    PanelLeft
} from "lucide-react";

import { plcService } from "../../services/deviceService";
import { PLCOut } from "../../types";

import { useAuth } from "../../contexts/index";
import { 
    Header, 
    CreateDevice, 
    AllDevices, 
    Plc,
    CreatePlc,
    Popup 
} from "../index";

import { 
    PageWrapper, 
    Content, 
    Menu, 
    Main,
    PlcList,
    MenuTitle,
    InsertMenu
} from "./styles";

type PropsPlc = {
    children?: React.ReactNode;
};

type ActiveView = "devices" | "plc" | "createDevice" | "createPLC";

export function Dashboard({children}: PropsPlc)  {

    const { user, logout } = useAuth();

    const [ listPlcs, setListPlcs ] = useState<PLCOut[]>([]);
    const [ loadList, setLoadList ] = useState(false);
    const [ menuOpen, setMenuOpen ] = useState(true);
    const [ activeView, setActiveView ] = useState<ActiveView>("devices");
    const [ plcId, setPlcId ] = useState<number | null>(null);

    const loadListPlc = async () => {
        try {
            const response = await plcService.list();
            setListPlcs(response);
        } catch {
            setListPlcs([]);
        }
    };

    useEffect(() => {
        loadListPlc();
    }, []);

    const handlePlc = (id: number) => {
        setPlcId(id);
        setActiveView("plc");
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    const handleInsertMenu = () => {
        setMenuOpen(true);
    };

    const handleAllDevices = () => {
        setActiveView("devices");
    };

    const handleListPlcs = () => {
        setLoadList(true);
        loadListPlc();
    };

    const handleListPlcsClose = () => {
        setLoadList(false);
    };

    const handleNewPlc = () => {
        setActiveView('createPLC');
    };

    const handleNewDevice = () => {
        setActiveView('createDevice');
    };

    return (
        <PageWrapper>
            <Header user={user} onLogout={logout} />
            
            <Main >
                {menuOpen ? (
                    <Menu>
                        <MenuTitle>
                            <h3> Menu </h3>
                            <button className="close-menu-button" onClick={handleCloseMenu}>
                                <PanelLeft size={20} strokeWidth={2.5}/>
                            </button>
                        </MenuTitle>
                        
                        <div className="nav-section">
                            <a className="menu-link" onClick={handleNewDevice} >
                                <Plus size={16} /> 
                                New Device 
                            </a>
                            <a className="menu-link" onClick={handleAllDevices}>
                                <GalleryVerticalEnd size={16} />
                                Devices
                            </a>
                            <a className="menu-link" onClick={handleListPlcs}>
                                <Cpu size={16}/>
                                PLCs
                            </a>
                            <>
                                {loadList && (
                                    <PlcList >
                                        {children}
                                        {listPlcs.map((plc) => (
                                            <a 
                                                className="nav-link" 
                                                key={plc.id} 
                                                onClick={() => handlePlc(plc.id)} 
                                            >
                                                {plc.name}
                                            </a>
                                        ))}
                                        <div className="actions-list">
                                            <button className="close-button" onClick={handleNewPlc}>
                                                <Plus size={18}/>
                                            </button>

                                            <button className="close-button" onClick={handleListPlcsClose}>
                                                <ChevronUp size={16}/>
                                            </button>
                                        </div>
                                    </PlcList>
                                )}
                            </>
                        </div>
                    </Menu>
                ) : (
                    <InsertMenu >
                        <button className="insert-menu-button" onClick={handleInsertMenu}>
                            <PanelLeft size={20} strokeWidth={2.5}/>
                        </button>
                    </InsertMenu>
                )}

                
                
                <Content $menuOpen={menuOpen}>
                    {activeView === "devices" && 
                        <AllDevices />
                    }
                    
                    {activeView === "plc" && plcId !== null &&
                        <Plc controllerId={plcId} />
                    }

                    {activeView === "createPLC" && 
                        <Popup>
                            <CreatePlc onSuccess={() => {
                                setActiveView("devices");
                                loadListPlc();
                            }}/>
                        </Popup>
                    }

                    {activeView === "createDevice" &&
                        <Popup>
                            <CreateDevice /> 
                        </Popup>
                    }
                </Content>
            </Main>

            

        </PageWrapper>
    )
}