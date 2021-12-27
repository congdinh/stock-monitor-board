import { connect as connectMongoDB } from '../external-libs/mongoose';

import CategoryModel from '../datasources/mongo-datasource/category';
import SymbolModel from '../datasources/mongo-datasource/symbol';

async function run() {
  const data = [
    {
      code: '8600',
      name: 'Bất động sản',
      nameEn: 'Real Estate',
      symbols:
        'HDG,E29,TN1,FTI,KOS,VRE,VRE12007,TIP,TCH,HGR,TID,BCM,HPI,EIN,HD2,LDG,HGC,AGG,SZB,PWA,ILB,HPX,NRC,VPI,SNZ,HTT,BAX,SID,PNT,NVL,NVL11715,NVL11714NVL11605,NVL21602,NVL21603,NVL21604,NVL11708,HU6,HD8,CRE,HIZ,PLA,HRB,LEC,LAI,HD6,SIP,FIR,DCH,IDC,DTI,SGR,VHM,VHM11801,VHM11802,VHM11726,MH3,NTC,BII,SII,FLC,FIT,NLG,CEO,HAR,CCL,DIH,CIG,NDN,D11,SDI11717,C21,FDC,ASM,DXG,TIX,CSC,HDC,ITC,SDU,LGL,VPH,VNI,D2D,DIG,NBB,HAG,SZL,VIC,VIC11707,VIC11725,VIC11724,VIC11711,VIC11502,VIC11716,VIC11503,VIC11504,VIC11813,VIC11901,VIC11814,VIC11501,RCL,NTL,KBC,KBC11710,KBC11806,KBC11712,KBC12006,KHA,CII,CII11713,CII11709,CII11722,CII41401,CII11803,CII11815,UNI,SJS,TDH,ITA,PXL,PFL,SCR,SCR11816,KAC,HQC,TIG,OCH,IDJ,QCG,VRC,DRH,STL,CLG,PDR,DTA,PVR,OGC,VCR,NTB,DLR,IDV,TNT,NVT,PVL,PPI,LHG,KDH'
    },
    {
      code: '3500',
      name: 'Thực phẩm & Đồ uống',
      nameEn: 'Food & Beverage',
      symbols:
        'BLF,IDP,MCM,GQN,MML,CFV,SKH,BBM,SKV,APF,QHW,QNS,SGO,HNG,PAN,GTN,SKN,EPC,KGM,KSE,CMN,BMV,HBH,HLB,SEP,SBL,BTB,MCH,HKT,CMF,FCC,HNF,VLC,HJC,HVA,HKB,SCABCF,NNQ,CPA,CBC,THP,BKH,BHG,C22,ILA,BLT,CBS,BSL,PCF,VOC,NAF,TAR,NSS,BSH,HSL,BHK,BAL,CAT,HAV,TCJ,SJF,BSD,BSQ,PNG,AGX,MXC,HGA,VSF,KHS,JOS,NHV,ANT,VSN,VHI,CCA,TAN,APT,FGL,HNR,BQB,FCS,SPV,MLS,SEA,SB1,AFX,BHN,BSP,CTP,NDF,SPH,PRO,TFC,SLS,SNC,SSN,BHP,AGM,MCF,VCF,KTS,IDI,FDG,TH1,MSN,MSN11718,MSN11719,MSN11906,MSN12001,MSN12005,MSN12002,MSN12003,HVG,HHC,DBC,ATA,CFC,THB,ACL,LSS,TSC,SAB,NGC,SBT,PIT,VHC,ANV,KDC,VDL,TS4,CAN,NSC,VTL,ICF,IFS,SAF,SGC,VNM,LAF,SSC,SCD,TAC,SJ1,AGF,FMC,HNM,MPC,ABT,BBC,AVF,CMX,HAT,VKD,SPD,PSL,SMB,VHF,AAM,CAD,WSB,VNH,HAD'
    },
    {
      code: '3700',
      name: 'Đồ dùng cá nhân và đồ gia dụng',
      nameEn: 'Personal & Household Goods',
      symbols:
        'KMR,AAT,NJC,HNE,QNT,PQN,ATD,AQN,BMG,DCG,HVH,BBT,HNI,TVT,HAN,VGG,RBC,G20,KTL,THD,CKG,TLI,MSH,A32,XDH,HUG,MGG,PPH,AC4,FTM,VGT,SHX,MPT,TDF,CT5,LGM,HPUVTJ,DM7,X26,TDT,HSM,X20,M10,HTG,BDG,SVD,HKC,HC1,GTK,HCB,AG1,NTT,NHT,VEC,SPB,HLT,VDM,MNB,HFS,GTD,XHC,ASA,SHA,BVN,FBA,MDF,VTI,LIX,MHL,TTF,GTA,GMC,GDT,HLG,DCS,NDT,VBH,TNG,TNG119007,TCM,NST,GIL,VTB,CLC,SAV,EVE,TTG,NET,SSF,PTG,VDN,KSD,DLG,TET,TLG,TMW,HDM,SHI,NAG'
    },
    {
      code: '3300',
      name: 'Ôtô & linh kiện phụ tùng ',
      nameEn: 'Automobiles & Parts',
      symbols: 'CSM,VEA,IRC,FT1,VMA,HHS,DAS,SRC,DRC,TMT'
    },
    {
      code: '7500',
      name: 'Dịch vụ tiện ích',
      nameEn: 'Utilities',
      symbols:
        'PVG,DTE,BNW,PDT,BLW,TVW,PWS,NVP,BDW,GSM,TTA,REE,HAW,NDW,TOW,DWS,PEG,HWS,NQN,BWS,BGW,HDW,THN,HNA,TNW,NLS,NBT,THW,NQB,EBA,E12,NSL,PMW,SBH,PGV,NED,DNHCMW,GEG,CHS,VCP,TAP,DNW,ABR,LDW,PMG,VPW,VAV,DNN,TDB,QTP,EIC,DBW,DTK,SP2,EAD,CTW,TDM,LAW,BSA,STW,POW,LWS,BPW,DNA,SBM,NAW,BHA,HPW,HND,TAW,ISH,HPD,NTH,TQW,TTE,HBW,DVW,GLW,AVC,SVH,HLE,BWE,VLW,KHW,NS3,QNW,NQT,HTW,LCW,NS2,VCW,S4A,NCP,VPD,PIC,DRL,GSP,NTW,LKW,PJS,CNG,QPH,DVC,THS,NNT,CLW,PGD,BTP,ASP,VMG,NBP,PGS,TMP,MTG,SEB,PGC,GAS,TBC,PPC,DTC,HJS,SJD,VSH,KHP,TDW,HFC,BTW,NBW,SHP,CHP,SBA,BWA,GDW,NT2'
    },
    {
      code: '4500',
      name: 'Y tế',
      nameEn: 'Health Care',
      symbols:
        'PMC,MED,SOV,NTF,MRF,BCP,DP3,VET,DPH,AGP,DTP,ABS,VNY,DBD,AMP,TW3,CDP,PME,TVP,DHD,DTG,TTD,TNH,PBC,BIO,DP1,YTC,NDP,VXP,DHN,VDP,DP2,DVN,HDP,UPH,DOC,MEFJVC,DNM,AMV,DBT,PPP,DDN,TRA,DHT,MKV,OPC,DHG,IMP,DMC,MTP,LDP,DBM,DCL,DPP,SPM,MKP,NDC'
    },
    {
      code: '2300',
      name: 'Xây dựng & Vật liệu',
      nameEn: 'Construction & Materials',
      symbols:
        'L43,DVG,GMA,SZC,TS5,TS3,TA6,PCC,SCY,CC1,DSG,LMI,HEJ,GKM,CGV,TVA,PC1,GTS,L63,APL,BTU,XMD,MCI,PSG,RCD,TTB,CPW,DTB,HTN,LG9,MIE,DTD,VVN,PCM,LIC,C36,X77AMS,USC,PXC,MCT,L12,TB8,MES,HMG,L45,KPF,HPM,TA9,C71,SHG,NMK,HSP,UDL,XLV,S72,HAM,LLM,CC4,HTE,ACS,HC3,EVG,PVH,CEG,HFB,MVC,NAC,HGW,DCF,VWS,DPG,ROS,DT4,ICC,I10,TL4,TVH,DX2,AAV,TGG,BUD,SJG,FBC,ATB,VGV,EME,VHD,CH5,SBV,TRT,CDG,GND,CCV,HEC,RCC,LQN,DC1,CLH,BMN,MBG,PDB,PTE,ICN,CDO,DXD,VW3,GAB,CMD,HUB,FIC,TTL,TCK,CIP,CCH,CDR,HMS,TCD,CEE,FSO,DND,CQT,HCD,MST,KDM,VGC,BOT,C4G,DCR,QLD,TA3,BTN,VIW,TLD,BDT,VIH,C69,BTD,HHR,C12,G36,RLC,VLB,HID,NSG,HU4,SDX,VE8,KHL,VMI,STV,VE4,PEN,SDB,VHH,YBC,CEC,CTX,FCN,HFX,PID,ASD,QCC,VCX,NDX,HLD,VRG,S96,SCI,L14,GMX,CI5,SDK,DTV,H11,KCE,C47,VDT,L40,HU3,PTD,BHT,HDA,VSI,PTB,GHC,PXA,MDG,SVN,THG,CTD,LHC,V12,SHN,TKC,CT3,TNM,GTH,B82,DXV,VC6,VE9,VIT,HT1,PHC,CVT,VC9,ACE,HOM,S74,VC1,ICG,VHL,QTC,PVA,SD8,L61,LCG,TBX,DC4,CCM,VCG,VE1,TV4,CDC,C92,BT6,QNC,DIC,CMC,L62,HUT,VC5,S12,VNE,VCS,TCR,SJC,SD2,SCJ,SC5,LGC,SJM,LUT,SDD,VC7,L10,XMC,VC3,SDJ,HCC,UIC,DPC,BCC,BTS,NAV,NHC,BMP,SD6,CID,SDY,VTS,CYC,HAS,MEC,PTC,SDT,SD9,SJE,VMC,CTN,HBC,TTC,DAC,HLY,LBM,DNP,TLT,VTV,VTA,SDN,SIC,VC2,MCO,S99,SD3,SCC,DHA,NTP,SD5,SD7,TXM,DCT,SDC,S55,HTI,PX1,LM7,TVG,ADP,DGT,C32,PSB,PEC,CTA,HVX,PTL,HCI,ALV,S27,SCL,PVV,CVN,BVG,LCC,VE2,NHA,ND2,VE3,TBT,L44,SDH,UDJ,DNC,LO5,SD4,L18,V15,DID,IME,LM3,PVX,SDP,SD1,VCT,BCE,HU1,UDC,ICI,DC2,LCS,NNC,V21,QHD,LIG,MCC,TDC,CT6,CX8,PXT,PXS,PXM,PXI,VXB,IJC,VES,DAG,PHH,CTI,SDE,L35,MCG,TMX,VPC,ACC,TV3,VCC,V11,SSM,CNT'
    },
    {
      code: '2700',
      name: 'Hàng hóa và dịch vụ công nghiệp',
      nameEn: 'Industrial Goods & Services',
      symbols:
        'VIN,CFM,MTB,CGL,GIC,MHP,CQN,PNP,PHN,VTP,VSE,ILC,CIA,MND,CCT,MPY,PYU,HCS,SSU,NNB,TTV,NBR,CNN,DBH,MTL,VTM,SGN,ISG,UEM,NCT,ASG,TR1,DKC,VXT,USD,PBT,MBNNAU,VGR,HLS,CPI,THI,DAR,MVY,NAS,HEM,QBR,TVU,HRT,SAC,RTS,QSP,CDH,VPA,TVM,DLT,CMK,VMS,TOP,SAS,TKA,BBH,PLO,DUS,DDG,MVN,ILS,UMC,SCS,CVH,BMD,MLC,QLT,CKH,PKR,HSA,NTR,ACV,YRC,SGP,KIP,NWT,VSA,TPS,NNG,SHE,MQN,PRT,EMS,MQB,CAG,MTV,TOT,VLP,VSM,DSS,TEC,THR,HTR,RTH,TUG,UPC,DFC,DSV,HLR,UCT,DNR,CDN,IFC,CLM,HHV,NAP,BCG,CTT,NHP,LPT,MA1,DKH,CAM,IBD,BLU,HEP,SAL,SVL,THU,EMG,BRS,HNT,BTR,RAT,HKP,ITS,GEX,DOP,CCR,PMP,PHP,BHC,HAH,SIG,MHY,HTK,MDA,SON,SUM,DS3,TCW,PDV,TSG,DNE,CE1,CCP,RHN,QNU,NUE,SPA,IST,TNP,PVM,PVP,HHN,HTU,SZE,SRT,DDH,CMP,DAT,TRS,VLG,PBP,CLL,TTZ,GGG,SKG,KSK,MTH,SVI,SPI,DNL,VTX,DHP,EMC,CAV,TBD,SGS,PPE,NOS,TSB,HTL,PDN,PPS,SWC,SSG,INC,MAC,DVP,GLT,BXH,VKP,VNA,SRB,DQC,HTV,TCO,VNL,DZM,VST,TPP,SPP,VSG,DDM,VSC,PVE,VTO,VFR,TPC,TJC,SFN,SFI,PVT,PTS,PSC,PJC,BTH,HCT,PJT,SDA,VNC,TMS,VSP,CJC,PMS,GMD,VFC,CTB,TTP,BBS,HBD,DXP,MCP,SHC,VGP,STP,BPC,RAL,VIP,PAC,MHC,CMS,VNF,PRC,VKC,LCD,LM8,KTT,ARM,STU,SMA,VQC,PTH,PTT,TV1,SCO,VOS,PCT,AAA,WTC,MAS,HMH,TCL,HHG,GER,HPB,VCM,AME,STS,VBC,BTG,DL1,STG,PSP,HDO,PGT,SDG,TV2,SRF,RDP,VNT'
    },
    {
      code: '5300',
      name: 'Dịch vụ bán lẻ',
      nameEn: 'Retail',
      symbols:
        'DAD,STH,LMH,AST,HAF,TTH,DGW,FID,BNA,MEG,CEN,CPH,FRT,PNJ,VHE,LBC,GCB,SMN,CRC,KTC,HTM,T12,AUM,BMF,FHN,NBE,CTF,CLX,VNB,MWG,AMD,SDV,BSC,VLF,TIE,BED,EFISED,QST,DST,TNA,TMC,SVC,PET,HAX,SFC,COM,EBS,PNC,VMD,CMV,KBE,BST,CTC,HTC,CCI,BTT,BDB'
    },
    {
      code: '8700',
      name: 'Dịch vụ tài chính',
      nameEn: 'Financial Services',
      symbols:
        'HCM,EVF,IPA,AAS,ART,FUEVFVND,FUESSVFL,FUESSV50,TVS,CSI,IBC,E1VFVN30,FUEVN100,EVS,FUCTVGF2,FUCTVGF1,FUCVREIT,HAC,TVC,FTS,TCI,VCI,MBS,BMS,DSC,TVB,VFSBSI,IVS,VIX,AGR,VIG,API,CTS,VDS,APS,BVS,SSI,PV2,PIV,PSI,APG,WSS,SHS,HBS,ORS,SBS,PHS,VND'
    },
    {
      code: '6500',
      name: 'Viễn thông',
      nameEn: 'Telecommunications',
      symbols: 'VTC,TTN,VGI,CTR,TEL,FOX,MFS,PTO,ABC'
    },
    {
      code: '1700',
      name: 'Tài nguyên',
      nameEn: 'Basic Resources',
      symbols:
        'THT,BKG,KLM,MEL,MVB,MGC,MTM,TVN,TEG,DPS,PAS,HUX,DRG,CHC,TQN,VIM,ACM,LNC,BCB,CKA,HHP,FRM,TNI,TTS,VBG,GVT,TMB,VIF,PIS,GLC,FRC,HII,TMG,ATG,KCB,CKD,KVCCBI,LMC,PLP,NSH,VPR,MSR,MSR118001,MSR11808,VDB,VPG,MC3,VCE,TNS,KHD,VGL,KSV,MTA,KSQ,FCM,DHM,LCM,ITQ,PTK,TDS,AMC,DAP,VCA,TIS,NKG,TVD,KSB,HGM,HPG,HMC,KMT,MDC,DHC,TDN,HLA,CAP,BMC,MIC,TKU,NBC,VID,VIS,SMC,HAP,TNB,KTB,MIM,DNS,BMJ,SQC,HSG,VGS,KKC,TC6,CMI,KHB,DTL,DNY,POM,TLH,HLC,KSH,BKC'
    },
    {
      code: '5700',
      name: 'Du lịch & Giải trí',
      nameEn: 'Travel & Leisure',
      symbols:
        'VNS,BCV,VTR,HGT,HVN,DAH,TSD,RGC,HES,BSG,BLN,VTG,HNB,VTD,TSJ,ATS,CXH,NCS,BXT,DSP,TTT,BTV,VJC,VJC11912,MTC,KLF,DLD,STT,HOT,VNG,DNT,RIC,TCT,SGH,DSN,WCSGTT,VIR,DXL,PDC'
    },
    {
      code: '5500',
      name: 'Phương tiện truyền thông',
      nameEn: 'Media',
      symbols:
        'INN,VEF,ADG,YEG,CAB,IPH,DNB,HAB,FHS,EPH,FOC,IKH,SVT,ADC,EID,ECI,HEV,LBE,HBE,SGD,HTP,ALT,DAE,STC,TPH,SAP,IHK,PTP,IN4,VNX'
    },
    {
      code: '8300',
      name: 'Ngân hàng',
      nameEn: 'Banks',
      symbols:
        'STB,LPB,BVB,MSB,VPB,TPB,MBB,BID,BID10306,BID10406,BID11908,SGB,VCB,VIB,OCB,HDB,NVB,NAB,KLB,TCB,BAB,ABB,SSB,VBB,EIB,PGB,SHB,CTG,ACB'
    },
    {
      code: '9500',
      name: 'Công nghệ',
      symbols:
        'ONE,BEL,VTK,VTE,ONW,PAI,ICT,PIA,PMJ,SBD,VTH,PSD,VIE,VAT,KST,TAG,VHG,SGT,TGP,HIG,SRA,TST,ST8,POT,FPT,TYA,LTC,SAM,ELC,VLA,PMT,HPT,SMT,CKV,CMT,ITD,CMG',
      nameEn: 'Technology'
    },
    {
      code: '0500',
      name: 'Dầu khí',
      nameEn: 'Oil & Gas',
      symbols: 'POV,PLE,PTV,TLP,POB,POS,TDG,PLX,PVO,BSR,PND,PSN,PCN,PSH,OIL,PEQ,PTX,PVY,MTS,PPY,PVB,PCG,PVS,PVC,PVD'
    },
    {
      code: '1300',
      name: 'Hóa chất',
      nameEn: 'Chemicals',
      symbols:
        'PHR,DPD,APH,BRR,PSW,DDV,DCM,SBR,TDP,GVR,DCI,VPS,PGN,YBM,CET,SIV,DRI,PSE,NHH,DHB,ADS,BFC,PCE,HPH,LTG,SVG,STK,CSV,HNP,RTB,BT1,PMB,VAF,QBS,BRC,LAS,NFCSFG,XPH,DGC,CNC,SPC,HPP,CPC,VFG,PLC,HRC,HVT,DPR,VNP,TRC,TNC,DPM,HSI,HAI,DTT,APP,APC'
    },
    {
      code: '8500',
      name: 'Bảo hiểm',
      nameEn: 'Insurance',
      symbols: 'BVH,PRE,AIC,BLI,MIG,PTI,PGI,PVI,BIC,VNR,BMI,ABI'
    }
  ];

  const symbols = [
    {
      code: 'E1VFVN30',
      companyName: 'Quỹ ETF VFMVN30 ',
      exchange: 'HOSE',
      shortName: 'Quỹ ETF VFMVN30',
      companyNameEn: 'VietFund Management'
    },
    {
      code: 'FUESSV50',
      companyName: 'QUỸ ETF SSIAM VNX50',
      exchange: 'HOSE',
      shortName: 'ETF SSIAM VNX50',
      companyNameEn: 'SSIAM VNX50 ETF'
    },
    {
      code: 'FUESSVFL',
      companyName: 'QUỸ ETF SSIAM VNFIN LEAD',
      exchange: 'HOSE',
      shortName: 'SSIAM VNFIN LEAD',
      companyNameEn: 'SSIAM VNFIN LEAD ETF'
    },
    {
      code: 'FUEVFVND',
      companyName: 'Công ty Cổ phần Quản Lý Quỹ Đầu Tư Việt Nam (Quỹ ETF VFMVN DIAMOND)',
      exchange: 'HOSE',
      shortName: 'Quỹ ETF VFMVN DIAMOND',
      companyNameEn: 'VFMVN DIAMOND ETF'
    },
    {
      code: 'FUEVN100',
      companyName: 'QUỸ ETF VINACAPITAL VN100',
      exchange: 'HOSE',
      shortName: 'VINACAPITAL VN100 ETF',
      companyNameEn: 'VINACAPITAL VN100 ETF'
    },
    {
      code: 'FUESSV30',
      companyName: 'Quỹ ETF SSIAM VN30',
      exchange: 'HOSE',
      shortName: 'SSIAM VN30',
      companyNameEn: 'SSIAM VN30 ETF'
    },
    {
      code: 'FUEMAV30',
      companyName: 'QUỸ ETF MAFM VN30',
      exchange: 'HOSE',
      shortName: 'ETF MAFM VN30',
      companyNameEn: 'MAFM VN30 ETF'
    },
    {
      code: 'FUCTVGF1',
      companyName: 'Quỹ đầu tư tăng trưởng TVAM',
      exchange: 'HOSE',
      shortName: 'Quỹ ĐTTT TVAM',
      companyNameEn: 'TVAM Growth Fund'
    },
    {
      code: 'FUCVREIT',
      companyName: 'Quỹ đầu tư bất động sản Techcom Việt Nam',
      exchange: 'HOSE',
      shortName: 'Quỹ BĐS Techcom VN',
      companyNameEn: 'Techcom Vietnam REIT Fund'
    },
    {
      code: 'FUCTVGF2',
      companyName: 'Quỹ Đầu tư Tăng trưởng Thiên Việt 2',
      exchange: 'HOSE',
      shortName: 'Quỹ Thiên Việt 2',
      companyNameEn: 'Thien Viet Growth Fund 2'
    },
    {
      code: 'IPA',
      companyName: 'Công ty Cổ phần Tập đoàn đầu tư I.P.A',
      exchange: 'UPCOM',
      shortName: 'Tập đoàn I.P.A',
      companyNameEn: 'I.P.A INVESTMENTS GROUP JOINT STOCK COMPANY'
    },
    {
      code: 'AGF',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu thủy sản An Giang ',
      exchange: 'UPCOM',
      shortName: 'Thủy sản An Giang',
      companyNameEn: 'An Giang Fisheries Import and Export Joint Stock Company'
    },
    {
      code: 'PMS',
      companyName: 'Công ty Cổ phần Cơ khí Xăng dầu',
      exchange: 'HNX',
      shortName: 'Cơ khí Xăng dầu',
      companyNameEn: 'Petroleum Mechanical Stock Company'
    },
    {
      code: 'CID',
      companyName: 'Công ty Cổ phần Xây dựng và phát triển cơ sở hạ tầng',
      exchange: 'UPCOM',
      shortName: 'P.triển hạ tầng',
      companyNameEn: 'Construction and Infrastructure Development Joint Stock Corporation'
    },
    {
      code: 'CAN',
      companyName: 'Công ty Cổ phần Đồ hộp Hạ Long',
      exchange: 'HNX',
      shortName: 'Đồ hộp Hạ Long',
      companyNameEn: 'Halong Canned Food Joint Stock Corporation'
    },
    {
      code: 'DAC',
      companyName: 'Công ty Cổ phần Viglacera Đông Anh',
      exchange: 'UPCOM',
      shortName: 'Viglacera Đông Anh',
      companyNameEn: 'Dong Anh Viglacera Joint - stock Company'
    },
    {
      code: 'TNC',
      companyName: 'Công ty Cổ phần Cao su Thống Nhất',
      exchange: 'HOSE',
      shortName: 'Cao su Thống Nhất',
      companyNameEn: 'Thong Nhat Rubber Joint Stock Company'
    },
    {
      code: 'CTS',
      companyName: 'Công ty Cổ phần Chứng khoán Ngân hàng Công thương Việt Nam',
      exchange: 'HOSE',
      shortName: 'CK Vietinbank',
      companyNameEn: 'Vietnam Bank for Industry and Trade Securities Joint Stock Company'
    },
    {
      code: 'LAF',
      companyName: 'Công ty Cổ phần Chế biến hàng xuất khẩu Long An',
      exchange: 'HOSE',
      shortName: 'C.biến XK Long An',
      companyNameEn: 'Long An Food Procesing Export Joint Stock Company'
    },
    {
      code: 'BBT',
      companyName: 'Công ty Cổ phần Bông Bạch Tuyết',
      exchange: 'UPCOM',
      shortName: 'Bông Bạch Tuyết',
      companyNameEn: 'Bach Tuyet Cotton Corporation'
    },
    {
      code: 'NHC',
      companyName: 'Công ty Cổ phần gạch ngói Nhị Hiệp ',
      exchange: 'HNX',
      shortName: 'Gạch ngói Nhị Hiệp',
      companyNameEn: 'Nhi Hiep Brick-Tile Joint Stock Company'
    },
    {
      code: 'SGH',
      companyName: 'Công ty Cổ phần Khách sạn Sài Gòn',
      exchange: 'HNX',
      shortName: 'Khách sạn Sài Gòn',
      companyNameEn: 'Saigon Hotel Corporation'
    },
    {
      code: 'GND',
      companyName: 'Công ty cổ phần Gạch ngói Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'Gạch ngói Đồng Nai',
      companyNameEn: 'Dong Nai Brick And Tile Corporation'
    },
    {
      code: 'MCC',
      companyName: 'Công ty Cổ phần Gạch ngói cao cấp',
      exchange: 'HNX',
      shortName: 'Gạch ngói cao cấp',
      companyNameEn: 'High – Grade Brick - Tile Corporation'
    },
    {
      code: 'VSN',
      companyName: 'Công ty cổ phần Việt Nam Kỹ Nghệ Súc Sản',
      exchange: 'UPCOM',
      shortName: 'VISSAN',
      companyNameEn: 'Vissan Joint Stock Company'
    },
    {
      code: 'BBC',
      companyName: 'Công ty Cổ phần Bibica',
      exchange: 'HNX',
      shortName: 'CTCP Bibica',
      companyNameEn: 'Bibica Corporation'
    },
    {
      code: 'SFC',
      companyName: 'Công ty Cổ phần Nhiên Liệu Sài Gòn ',
      exchange: 'HOSE',
      shortName: 'Nhiên Liệu SG',
      companyNameEn: 'Saigon Fuel Company'
    },
    {
      code: 'DHA',
      companyName: 'Công ty Cổ phần Hoá An',
      exchange: 'HOSE',
      shortName: 'CTCP Hoá An',
      companyNameEn: 'Hoa An Joint stock company'
    },
    {
      code: 'REE',
      companyName: 'Công ty Cổ phần Cơ điện lạnh',
      exchange: 'HOSE',
      shortName: 'CTCP Cơ điện lạnh',
      companyNameEn: 'Refrigeration Electrical Engineering Corporation'
    },
    {
      code: 'HAS',
      companyName: 'Công ty Cổ phần Hacisco',
      exchange: 'HOSE',
      shortName: 'CTCP Hacisco',
      companyNameEn: 'Hacisco Joint Stock Company'
    },
    {
      code: 'COM',
      companyName: 'Công ty Cổ phần Vật Tư - Xăng Dầu',
      exchange: 'HOSE',
      shortName: 'Vật Tư - Xăng Dầu',
      companyNameEn: 'Materials - Petroleum Joint Stock Company'
    },
    {
      code: 'SAM',
      companyName: 'Công ty Cổ phần SAM HOLDINGS',
      exchange: 'HOSE',
      shortName: 'CTCP SAM HOLDINGS',
      companyNameEn: 'SAM HOLDINGS Corporation'
    },
    {
      code: 'SAV',
      companyName: 'Công ty Cổ phần Hợp tác kinh tế và Xuất nhập khẩu SAVIMEX',
      exchange: 'HOSE',
      shortName: 'XNK SAVIMEX',
      companyNameEn: 'Savimex Corporation'
    },
    {
      code: 'BSI',
      companyName: 'Công ty Cổ phần Chứng khoán Ngân hàng Đầu tư và Phát triển Việt Nam',
      exchange: 'HOSE',
      shortName: 'Chứng khoán BIDV',
      companyNameEn: 'BIDV Securities Joint Stock Company'
    },
    {
      code: 'DPC',
      companyName: 'Công ty Cổ phần nhựa Đà Nẵng',
      exchange: 'HNX',
      shortName: 'CTCP nhựa Đà Nẵng',
      companyNameEn: 'Da Nang plastic Joint Stock Company'
    },
    {
      code: 'DXP',
      companyName: 'Công ty Cổ phần Cảng Đoạn Xá',
      exchange: 'HNX',
      shortName: 'Cảng Đoạn Xá',
      companyNameEn: 'Doan Xa Port Joint Stock Company'
    },
    {
      code: 'KDC',
      companyName: 'Công ty Cổ phần tập đoàn Kido ',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Kido',
      companyNameEn: 'Kido Group Corporation'
    },
    {
      code: 'PNC',
      companyName: 'Công ty Cổ phần văn hoá Phương Nam ',
      exchange: 'HOSE',
      shortName: 'Văn hoá Phương Nam',
      companyNameEn: 'Phuong Nam Cultural Joint Stock Corporation'
    },
    {
      code: 'FIC',
      companyName: 'Tổng Công ty Vật liệu Xây dựng số 1 – Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'TCT VLXD số 1',
      companyNameEn: 'FICO CORPORATION – JSC'
    },
    {
      code: 'CII',
      companyName: 'Công ty Cổ phần Đầu tư Hạ tầng Kỹ thuật Thành phố Hồ Chí Minh ',
      exchange: 'HOSE',
      shortName: 'H.tầng KT HCM',
      companyNameEn: 'Ho Chi Minh City Infrastructure Investment Joint Stock Company'
    },
    {
      code: 'PLX',
      companyName: 'Tập đoàn Xăng dầu Việt Nam',
      exchange: 'HOSE',
      shortName: 'Xăng dầu Việt Nam',
      companyNameEn: 'Vietnam National Petroleum Group'
    },
    {
      code: 'HCM',
      companyName: 'Công ty Cổ phần Chứng khoán Thành phố Hồ Chí Minh',
      exchange: 'HOSE',
      shortName: 'Chứng khoán HSC',
      companyNameEn: 'Ho Chi Minh City Securities Corporation'
    },
    {
      code: 'MHC',
      companyName: 'Công ty Cổ phần MHC',
      exchange: 'HOSE',
      shortName: 'CTCP MHC',
      companyNameEn: 'MHC JOINT STOCK COMPANY'
    },
    {
      code: 'SEA',
      companyName: 'Tổng Công ty Thủy sản Việt Nam – Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'TCT Thủy sản VN',
      companyNameEn: 'Viet Nam Seaproducts Joint Stock Corportion'
    },
    {
      code: 'BT6',
      companyName: 'Công ty Cổ phần Beton 6',
      exchange: 'UPCOM',
      shortName: 'CTCP Beton 6',
      companyNameEn: 'Beton 6 Corporation'
    },
    {
      code: 'HHC',
      companyName: 'Công ty Cổ phần Bánh kẹo Hải Hà',
      exchange: 'HNX',
      shortName: 'Bánh kẹo Hải Hà',
      companyNameEn: 'Haiha Confectionery Joint-Stock Company'
    },
    {
      code: 'M10',
      companyName: 'Tổng công ty May 10 - Công ty Cổ phần',
      exchange: 'UPCOM',
      shortName: 'Tổng CT May 10',
      companyNameEn: 'Garment 10 Corporation - Joint Stock Company'
    },
    {
      code: 'KTL',
      companyName: 'Công ty Cổ phần kim khí Thăng Long ',
      exchange: 'UPCOM',
      shortName: 'Kim khí Thăng Long',
      companyNameEn: 'Thang Long metal wares joint stock company'
    },
    {
      code: 'HPG',
      companyName: 'Công ty cổ phần Tập đoàn Hòa Phát ',
      exchange: 'HOSE',
      shortName: 'Hòa Phát',
      companyNameEn: 'Hoa Phat Group Joint Stock Company'
    },
    {
      code: 'BPC',
      companyName: 'Công ty Cổ phần Vicem Bao bì Bỉm sơn',
      exchange: 'HNX',
      shortName: 'Bao bì Bỉm sơn',
      companyNameEn: 'Vicem Packaging Bimson Joint Stock Company'
    },
    {
      code: 'ILC',
      companyName: 'Công ty Cổ phần Hợp tác lao động với nước ngoài',
      exchange: 'UPCOM',
      shortName: 'L.động nước ngoài',
      companyNameEn: 'International Labour and Services Stock Company'
    },
    {
      code: 'SJG',
      companyName: 'Tổng Công ty Sông Đà - CTCP',
      exchange: 'UPCOM',
      shortName: 'Tổng CT Sông Đà',
      companyNameEn: 'Song Da Corporation'
    },
    {
      code: 'GEG',
      companyName: 'Công ty Cổ phần Điện Gia Lai',
      exchange: 'HOSE',
      shortName: 'CTCP Điện Gia Lai',
      companyNameEn: 'Gia Lai Electricity Joint Stock Company'
    },
    {
      code: 'HDB',
      companyName: 'Ngân hàng Thương mại cổ phần Phát triển thành phố Hồ Chí Minh',
      exchange: 'HOSE',
      shortName: 'HDBank',
      companyNameEn: 'Ho Chi Minh City Development Joint Stock Commercial Bank'
    },
    {
      code: 'HAN',
      companyName: 'Tổng Công ty Xây dựng Hà Nội',
      exchange: 'UPCOM',
      shortName: 'TCT Xây dựng HN',
      companyNameEn: 'Hanoi Construction Corporation - JSC'
    },
    {
      code: 'DIG',
      companyName: 'Tổng Công ty Cổ phần Đầu tư Phát triển Xây dựng',
      exchange: 'HOSE',
      shortName: 'TCT ĐTPT Xây dựng',
      companyNameEn: 'Development Investment Construction Joint Stock Company'
    },
    {
      code: 'AIC',
      companyName: 'Tổng Công ty Cổ phần Bảo hiểm Hàng không',
      exchange: 'UPCOM',
      shortName: 'Bảo hiểm Hàng không',
      companyNameEn: 'Vietnam National Aviation Insurance Corporation'
    },
    {
      code: 'CC1',
      companyName: 'Tổng Công ty Xây dựng Số 1 – CTCP',
      exchange: 'UPCOM',
      shortName: 'TCT Xây dựng Số 1',
      companyNameEn: 'Construction Corporation No 1 Joint Stock Company'
    },
    {
      code: 'VSP',
      companyName: 'Công ty Cổ phần Vận tải biển và Bất động sản Việt Hải ',
      exchange: 'UPCOM',
      shortName: 'V.tải biển Việt Hải',
      companyNameEn: 'Viet Hai Shipping And Real Properties Corporation'
    },
    {
      code: 'PPC',
      companyName: 'Công ty Cổ phần Nhiệt điện Phả Lại ',
      exchange: 'HOSE',
      shortName: 'Nh.điện Phả Lại',
      companyNameEn: 'Pha Lai Thermal Power Joint Stock Company'
    },
    {
      code: 'TTP',
      companyName: 'Công ty Cổ phần Bao bì Nhựa Tân Tiến',
      exchange: 'UPCOM',
      shortName: 'Nhựa Tân Tiến',
      companyNameEn: 'Tan Tien Plastic Packaging Joint Stock Company'
    },
    {
      code: 'RDP',
      companyName: 'Công ty cổ phần Rạng Đông Holding',
      exchange: 'HOSE',
      shortName: 'Rạng Đông Holding',
      companyNameEn: 'Rang Dong Holding Joint Stock Company'
    },
    {
      code: 'KHP',
      companyName: 'Công ty Cổ phần Điện lực Khánh Hòa ',
      exchange: 'HOSE',
      shortName: 'Điện lực Khánh Hòa',
      companyNameEn: 'Khanh Hoa Power Joint Stock Company'
    },
    {
      code: 'VOS',
      companyName: 'Công ty Cổ phần Vận tải biển Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Vận tải biển VN',
      companyNameEn: 'Viet Nam Ocean Shipping Joint Stock Company'
    },
    {
      code: 'CYC',
      companyName: 'Công ty Cổ phần Gạch Men Chang Yih ',
      exchange: 'UPCOM',
      shortName: 'Gạch Men Chang Yih',
      companyNameEn: 'Chang Yih Ceramic Joint Stock Company'
    },
    {
      code: 'SMC',
      companyName: 'Công ty Cổ phần đầu tư thương mại SMC ',
      exchange: 'HOSE',
      shortName: 'Đ.tư T.mại SMC',
      companyNameEn: 'SMC  Trading- Investment Joint Stock Company'
    },
    {
      code: 'SDG',
      companyName: 'Công ty Cổ phần SADICO Cần Thơ',
      exchange: 'HNX',
      shortName: 'SADICO Cần Thơ',
      companyNameEn: 'Can Tho Sadico Joint Stock Corporation'
    },
    {
      code: 'HAP',
      companyName: 'Công ty Cổ phần Tập đoàn HAPACO',
      exchange: 'HOSE',
      shortName: 'Tập đoàn HAPACO',
      companyNameEn: 'HAPACO Joint Stock Company'
    },
    {
      code: 'HVX',
      companyName: 'Công ty Cổ phần xi măng Vicem Hải Vân ',
      exchange: 'HOSE',
      shortName: 'Xi măng Hải Vân',
      companyNameEn: 'Hai Van Cement Joint Stock Company'
    },
    {
      code: 'SHC',
      companyName: 'Công ty Cổ phần Hàng hải Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Hàng hải Sài Gòn',
      companyNameEn: 'Saigon Maritime Joint Stock Company'
    },
    {
      code: 'DCT',
      companyName: 'Công ty Cổ phần Tấm lợp Vật liệu Xây dựng Đồng Nai ',
      exchange: 'UPCOM',
      shortName: 'Lợp VLXD Đồng Nai',
      companyNameEn: 'Dongnai Roofsheet & Construction Material Joint Stock Company'
    },
    {
      code: 'TAC',
      companyName: 'Công ty Cổ phần Dầu thực vật Tường An',
      exchange: 'HOSE',
      shortName: 'Dầu Tường An',
      companyNameEn: 'Tuong An Vegetable Oil Joint Stock Company'
    },
    {
      code: 'NLG',
      companyName: 'Công ty Cổ phần Đầu tư Nam Long',
      exchange: 'HOSE',
      shortName: 'Đầu tư Nam Long',
      companyNameEn: 'Nam Long Investment Corporation'
    },
    {
      code: 'FMC',
      companyName: 'Công ty Cổ phần Thực phẩm Sao Ta ',
      exchange: 'HOSE',
      shortName: 'Thực phẩm Sao Ta',
      companyNameEn: 'Sao Ta Foods Joint Stock Company'
    },
    {
      code: 'SJS',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Đô thị và Khu công nghiệp Sông Đà',
      exchange: 'HOSE',
      shortName: 'KCN Sông Đà',
      companyNameEn: 'Song Da Urban & Industrial Zone Investment and Development Joint Stock Company'
    },
    {
      code: 'TYA',
      companyName: 'Công ty Cổ phần Dây và Cáp điện Taya Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Dây Cáp Taya VN',
      companyNameEn: 'Taya (VIET NAM) Electric Wire and Cable Joint Stock Company'
    },
    {
      code: 'NAV',
      companyName: 'Công ty Cổ phần Nam Việt ',
      exchange: 'HOSE',
      shortName: 'CTCP Nam Việt',
      companyNameEn: 'Nam Viet Joint Stock Company '
    },
    {
      code: 'PVS',
      companyName: 'Tổng Công ty Cổ phần Dịch vụ Kỹ thuật Dầu khí Việt Nam',
      exchange: 'HNX',
      shortName: 'DV KT D.khí VN',
      companyNameEn: 'Petrovietnam Technical Services Corporation'
    },
    {
      code: 'TNA',
      companyName: 'Công ty Cổ phần Thương Mại Xuất Nhập Khẩu Thiên Nam',
      exchange: 'HOSE',
      shortName: 'XNK Thiên Nam',
      companyNameEn: 'Thien Nam Trading & Import-Export Corporation'
    },
    {
      code: 'VNR',
      companyName: 'Tổng Công ty Cổ phần tái bảo hiểm quốc gia Việt Nam',
      exchange: 'HNX',
      shortName: 'Tái bảo hiểm VN',
      companyNameEn: 'Vietnam National Reinsurance Cooporation'
    },
    {
      code: 'BVH',
      companyName: 'Tập đoàn Bảo Việt ',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Bảo Việt',
      companyNameEn: 'BaoViet Holdings'
    },
    {
      code: 'BMI',
      companyName: 'Tổng Công ty Cổ phần Bảo Minh ',
      exchange: 'HOSE',
      shortName: 'Bảo Minh',
      companyNameEn: 'BaoMinh Insurance Corporation'
    },
    {
      code: 'PGI',
      companyName: 'Tổng Công ty Cổ phần Bảo hiểm Petrolimex ',
      exchange: 'HOSE',
      shortName: 'Bảo hiểm Petro',
      companyNameEn: 'PJICO Insurance Corporation'
    },
    {
      code: 'ONW',
      companyName: 'Công ty Cổ phần Dịch vụ Một Thế Giới',
      exchange: 'UPCOM',
      shortName: 'DV Một thế giới',
      companyNameEn: 'One World Services Joint Stock Company'
    },
    {
      code: 'BLI',
      companyName: 'Tổng Công ty Cổ phần Bảo Hiểm Bảo Long',
      exchange: 'UPCOM',
      shortName: 'Bảo Hiểm Bảo Long',
      companyNameEn: 'BAO LONG INSURANCE CORPORATION'
    },
    {
      code: 'PVI',
      companyName: 'Công ty Cổ phần PVI',
      exchange: 'HNX',
      shortName: 'CTCP PVI',
      companyNameEn: 'PVI Holdings'
    },
    {
      code: 'PTI',
      companyName: 'Tổng Công ty Cổ phần bảo hiểm bưu điện',
      exchange: 'HNX',
      shortName: 'Bảo hiểm bưu điện',
      companyNameEn: 'Post & Telecommunication Joint Stock Insurance Corporation'
    },
    {
      code: 'TTD',
      companyName: 'Công ty cổ phần Bệnh viện Tim Tâm Đức',
      exchange: 'UPCOM',
      shortName: 'BV Tim Tâm Đức',
      companyNameEn: 'Tam Duc Cardiology Hospital Joint Stock Company'
    },
    {
      code: 'PVD',
      companyName: 'Tổng Công ty Cổ phần Khoan và Dịch vụ khoan dầu khí',
      exchange: 'HOSE',
      shortName: 'DV khoan D.khí',
      companyNameEn: 'PetroVietNam Drilling and Well Services Joint Stock Company'
    },
    {
      code: 'BBS',
      companyName: 'Công ty Cổ phần VICEM Bao bì Bút Sơn',
      exchange: 'HNX',
      shortName: 'Bao bì Bút Sơn',
      companyNameEn: 'VICEM But Son Packing Joint - Stock Company'
    },
    {
      code: 'BBH',
      companyName: 'Công ty cổ phần Bao bì Hoàng Thạch',
      exchange: 'UPCOM',
      shortName: 'Bao bì Hoàng Thạch',
      companyNameEn: 'Hoang Thach Packaging Joint Stock Company'
    },
    {
      code: 'BTS',
      companyName: 'Công ty Cổ phần Xi măng Vicem Bút Sơn',
      exchange: 'HNX',
      shortName: 'Xi măng Bút Sơn',
      companyNameEn: 'Vicem But Son Cement Joint Stock Company'
    },
    {
      code: 'VTO',
      companyName: 'Công ty Cổ phần Vận tải xăng dầu VITACO',
      exchange: 'HOSE',
      shortName: 'V.tải X.dầu VITACO',
      companyNameEn: 'Vietnam Tanker Joint Stock Company'
    },
    {
      code: 'BCC',
      companyName: 'Công ty Cổ phần Xi măng Bỉm Sơn',
      exchange: 'HNX',
      shortName: 'Xi măng Bỉm Sơn',
      companyNameEn: 'Bim Son Cement Joint Stock Company'
    },
    {
      code: 'HOM',
      companyName: 'Công ty Cổ phần Xi măng Vicem Hoàng Mai',
      exchange: 'HNX',
      shortName: 'Xi măng Hoàng Mai',
      companyNameEn: 'Vicem Hoang Mai Cement Joint Stock Company'
    },
    {
      code: 'CTG',
      companyName: 'Ngân hàng Thương mại Cổ phần Công Thương Việt Nam',
      exchange: 'HOSE',
      shortName: 'Vietinbank',
      companyNameEn: 'Vietnam Joint Stock Commercial Bank For Industrial And Trade'
    },
    {
      code: 'BID',
      companyName: 'Ngân hàng Thương mại Cổ phần Đầu tư và Phát triển Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Ngân hàng BIDV',
      companyNameEn: 'Bank for Investment and development of Vietnam'
    },
    {
      code: 'LLM',
      companyName: 'Tổng công ty lắp máy Việt Nam - Công ty Cổ phần',
      exchange: 'UPCOM',
      shortName: 'LILAMA',
      companyNameEn: 'Vietnam Machinery Installation Corporation - JSC'
    },
    {
      code: 'CSM',
      companyName: 'Công ty Cổ phần Công nghiệp Cao su Miền Nam',
      exchange: 'HOSE',
      shortName: 'Cao su Miền Nam',
      companyNameEn: 'The Sounthern Rubber Industry Joint Stock Company'
    },
    {
      code: 'SGS',
      companyName: 'Công ty Cổ phần vận tải biển Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Vận tải biển SG',
      companyNameEn: 'SaiGon Shippping Joint Stock Company'
    },
    {
      code: 'KHA',
      companyName: 'Công ty Cổ phần Đầu tư và Dịch vụ Khánh Hội',
      exchange: 'UPCOM',
      shortName: 'Dịch vụ Khánh Hội',
      companyNameEn: 'Khanh Hoi Investment And Services Corporation'
    },
    {
      code: 'NTP',
      companyName: 'Công ty Cổ phần Nhựa Thiếu niên Tiền Phong ',
      exchange: 'HNX',
      shortName: 'Nhựa Tiền Phong',
      companyNameEn: 'Tien Phong Plastics Joint Stock Company'
    },
    {
      code: 'ABT',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu thủy sản Bến Tre',
      exchange: 'HNX',
      shortName: 'Thủy sản Bến Tre',
      companyNameEn: 'Bentre Aquaproduct Import And Export Joint Stock Company'
    },
    {
      code: 'TBC',
      companyName: 'Công ty Cổ phần Thủy điện Thác Bà',
      exchange: 'HOSE',
      shortName: 'Th.điện Thác Bà',
      companyNameEn: 'Thac Ba Hydropower Joint-Stock Company'
    },
    {
      code: 'BMP',
      companyName: 'Công ty Cổ phần nhựa Bình Minh',
      exchange: 'HOSE',
      shortName: 'Nhựa Bình Minh',
      companyNameEn: 'Binh Minh Plastics Joint-stock Company'
    },
    {
      code: 'ABC',
      companyName: 'Công ty cổ phần Truyền thông VMG',
      exchange: 'UPCOM',
      shortName: 'Truyền thông VMG',
      companyNameEn: 'VMG Media Joint Stock Company'
    },
    {
      code: 'MBS',
      companyName: 'Công ty Cổ phần chứng khoán MB',
      exchange: 'HNX',
      shortName: 'Chứng khoán MB',
      companyNameEn: 'MB Securities Joint Stock Company'
    },
    {
      code: 'GIL',
      companyName: 'Công ty Cổ phần Sản Xuất Kinh Doanh Xuất Nhập Khẩu Bình Thạnh',
      exchange: 'HOSE',
      shortName: 'XNK Bình Thạnh',
      companyNameEn: 'BINHTHANH JOINT STOCK COMPANY'
    },
    {
      code: 'CMX',
      companyName: 'Công ty cổ phần Camimex Group',
      exchange: 'HOSE',
      shortName: 'Camimex Group',
      companyNameEn: 'Camimex Group Joint Stock Company'
    },
    {
      code: 'STB',
      companyName: 'Ngân hàng Thương mại Cổ phần Sài Gòn Thương Tín',
      exchange: 'HOSE',
      shortName: 'Sacombank',
      companyNameEn: 'SaiGon Thuong Tin Commercial Joint Stock Bank'
    },
    {
      code: 'VSH',
      companyName: 'Công ty Cổ phần Thủy điện Vĩnh Sơn – Sông Hinh',
      exchange: 'HOSE',
      shortName: 'Th.điện V.Sơn SH',
      companyNameEn: 'Vinh Son - Song Hinh Hydropower Joint Stock Company'
    },
    {
      code: 'BRR',
      companyName: 'Công ty Cổ phần Cao su Bà Rịa',
      exchange: 'UPCOM',
      shortName: 'Cao su Bà Rịa',
      companyNameEn: 'BaRia Rubber Joint Stock Company'
    },
    {
      code: 'MVC',
      companyName: 'Công ty cổ phần Vật liệu và Xây dựng Bình Dương',
      exchange: 'UPCOM',
      shortName: 'VLXD Bình Dương',
      companyNameEn: 'Binh Duong Building Materials & Construction Corporation'
    },
    {
      code: 'SCD',
      companyName: 'Công ty Cổ phần Nước Giải khát Chương Dương (CDBECO)',
      exchange: 'HOSE',
      shortName: 'Nc g.khát Ch.Dương',
      companyNameEn: 'Chuong Duong Beverages Company'
    },
    {
      code: 'VFC',
      companyName: 'Công ty Cổ phần Vinafco',
      exchange: 'UPCOM',
      shortName: 'CTCP Vinafco',
      companyNameEn: 'Vinafco Joint Stock Corporation'
    },
    {
      code: 'RAL',
      companyName: 'Công ty Cổ phần Bóng đèn Phích nước Rạng Đông ',
      exchange: 'HOSE',
      shortName: 'Phích Rạng Đông',
      companyNameEn: 'Rang Dong Light Sources and Vacuum Flask Joint Stock Company'
    },
    {
      code: 'TTC',
      companyName: 'Công ty Cổ phần Gạch men Thanh Thanh',
      exchange: 'HNX',
      shortName: 'Gạch Thanh Thanh',
      companyNameEn: 'Thanh Thanh Joint Stock Company'
    },
    {
      code: 'TS4',
      companyName: 'Công ty Cổ phần Thủy sản số 4 ',
      exchange: 'HOSE',
      shortName: 'Thủy sản số 4',
      companyNameEn: 'Seafood Joint Stock Company No 4'
    },
    {
      code: 'ACB',
      companyName: 'Ngân hàng Thương mại Cổ phần Á Châu',
      exchange: 'HOSE',
      shortName: 'Ngân hàng Á Châu',
      companyNameEn: 'Asia Commercial Joint Stock Bank'
    },
    {
      code: 'QNS',
      companyName: 'Công Ty Cổ Phần Đường Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'Đường Quảng Ngãi',
      companyNameEn: 'Quang Ngai Sugar Joint Stock Company'
    },
    {
      code: 'LSS',
      companyName: 'Công ty Cổ phần Mía đường Lam Sơn',
      exchange: 'HOSE',
      shortName: 'Mía đường Lam Sơn',
      companyNameEn: 'Lam Son Sugar cane Joint Stock Corporation'
    },
    {
      code: 'VTL',
      companyName: 'Công ty Cổ phần Vang Thăng Long',
      exchange: 'HNX',
      shortName: 'Vang Thăng Long',
      companyNameEn: 'Thanglong Joint-Stock Company'
    },
    {
      code: 'VIP',
      companyName: 'Công ty Cổ phần Vận tải Xăng dầu VIPCO',
      exchange: 'HOSE',
      shortName: 'V.tải X.dầu VIPCO',
      companyNameEn: 'Viet Nam Petroleum Transport Joint Stock Company'
    },
    {
      code: 'VSG',
      companyName: 'Công ty Cổ phần Container phía Nam ',
      exchange: 'UPCOM',
      shortName: 'Container phía Nam',
      companyNameEn: 'South Vietnam Container Shipping Joint Stock Company.'
    },
    {
      code: 'PGC',
      companyName: 'Tổng Công ty Gas Petrolimex - CTCP',
      exchange: 'HOSE',
      shortName: 'TCT Gas Petrolimex',
      companyNameEn: 'Petrolimex Gas Joint Stock Company'
    },
    {
      code: 'PAC',
      companyName: 'Công ty Cổ phần Pin Ắc quy miền Nam',
      exchange: 'HOSE',
      shortName: 'Pin miền Nam',
      companyNameEn: 'Dry Cell and Storage Battery Joint Stock Company'
    },
    {
      code: 'VNM',
      companyName: 'Công ty Cổ phần Sữa Việt Nam',
      exchange: 'HOSE',
      shortName: 'VINAMILK',
      companyNameEn: 'Vietnam Dairy Products Joint Stock Company'
    },
    {
      code: 'TMS',
      companyName: 'CÔNG TY CỔ PHẦN TRANSIMEX',
      exchange: 'HOSE',
      shortName: 'CTCP TRANSIMEX',
      companyNameEn: 'TRANSIMEX CORPORATION'
    },
    {
      code: 'HIG',
      companyName: 'Công ty Cổ phần Tập đoàn HIPT ',
      exchange: 'UPCOM',
      shortName: 'CTCP Tập đoàn HIPT',
      companyNameEn: 'HIPT Group Joint Stock Company'
    },
    {
      code: 'MTG',
      companyName: 'Công ty Cổ phần MT GAS',
      exchange: 'UPCOM',
      shortName: 'CTCP MT GAS',
      companyNameEn: 'MT GAS Joint Stock Company'
    },
    {
      code: 'VDP',
      companyName: 'Công ty Cổ phần Dược phẩm Trung ương Vidipha',
      exchange: 'HOSE',
      shortName: 'Dược phẩm Vidipha',
      companyNameEn: 'Vidipha Central Pharmaccutical Joint Stock Company'
    },
    {
      code: 'CCM',
      companyName: 'Công ty Cổ phần Khoáng Sản Và Xi Măng Cần Thơ ',
      exchange: 'UPCOM',
      shortName: 'Xi Măng Cần Thơ',
      companyNameEn: 'Can Tho Cement Joint Stock Company'
    },
    {
      code: 'TCB',
      companyName: 'Ngân hàng Thương mại Cổ phần Kỹ Thương Việt Nam - Techcombank',
      exchange: 'HOSE',
      shortName: 'Techcombank',
      companyNameEn: 'Vietnam Technological and Commercial Join Stock Bank'
    },
    {
      code: 'VSA',
      companyName: 'Công ty Cổ phần Đại lý Hàng hải Việt Nam',
      exchange: 'HNX',
      shortName: 'Đại lý Hàng hải VN',
      companyNameEn: 'Viet Nam Ocean Shipping Agency Corporation'
    },
    {
      code: 'TDH',
      companyName: 'Công ty Cổ phần Phát triển nhà Thủ Đức',
      exchange: 'HOSE',
      shortName: 'Nhà Thủ Đức',
      companyNameEn: 'Thu Duc Housing Development Corporation'
    },
    {
      code: 'VIN',
      companyName: 'Công ty Cổ phần Giao nhận Kho vận Ngoại thương Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Giao nhận Kho vận',
      companyNameEn: 'Vinatrans'
    },
    {
      code: 'NBW',
      companyName: 'Công ty Cổ phần Cấp nước Nhà Bè',
      exchange: 'HNX',
      shortName: 'Cấp nc Nhà Bè',
      companyNameEn: 'Nha Be Water Supply Joint Stock Company'
    },
    {
      code: 'GMD',
      companyName: 'Công ty Cổ phần Gemadept ',
      exchange: 'HOSE',
      shortName: 'CTCP Gemadept',
      companyNameEn: 'Gemadept Corporation'
    },
    {
      code: 'UNI',
      companyName: 'Công ty Cổ phần Viễn Liên',
      exchange: 'HNX',
      shortName: 'CTCP Viễn Liên',
      companyNameEn: 'Vien Lien Joint Stock Company'
    },
    {
      code: 'DNA',
      companyName: 'Công ty Cổ phần Điện nước An Giang',
      exchange: 'UPCOM',
      shortName: 'Điện nước An Giang',
      companyNameEn: 'An Giang Power and Water Supply Joint Stock Company'
    },
    {
      code: 'OCB',
      companyName: 'Ngân hàng Thương mại Cổ phần Phương Đông',
      exchange: 'HOSE',
      shortName: 'Ngân hàng Phương Đông',
      companyNameEn: 'Orient Commercial Joint Stock Bank'
    },
    {
      code: 'SGB',
      companyName: 'NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN SÀI GÒN CÔNG THƯƠNG',
      exchange: 'UPCOM',
      shortName: 'SÀI GÒN CÔNG THƯƠNG',
      companyNameEn: 'SAI GON BANK FOR INDUSTRY AND TRADE'
    },
    {
      code: 'SSB',
      companyName: 'Ngân hàng Thương mại Cổ phần Đông Nam Á',
      exchange: 'HOSE',
      shortName: 'Ngân hàng TMCP Đông Nam Á',
      companyNameEn: 'SOUTHEAST ASIA COMMERCIAL JOINT STOCK BANK'
    },
    {
      code: 'VTC',
      companyName: 'Công ty Cổ phần viễn thông VTC',
      exchange: 'HNX',
      shortName: 'Viễn thông VTC',
      companyNameEn: 'VTC Telecommunications Joint Stock Company'
    },
    {
      code: 'HTV',
      companyName: 'Công ty cổ phần Logistics Vicem',
      exchange: 'HOSE',
      shortName: 'Logistics Vicem',
      companyNameEn: 'Logistics Vicem Joint Stock Company'
    },
    {
      code: 'HT1',
      companyName: 'Công ty Cổ phần xi măng Hà Tiên 1',
      exchange: 'HOSE',
      shortName: 'Xi măng Hà Tiên 1',
      companyNameEn: 'Ha Tien 1 Cement Joint Stock Company'
    },
    {
      code: 'SSI',
      companyName: 'Công ty Cổ phần chứng khoán SSI',
      exchange: 'HOSE',
      shortName: 'Chứng khoán SSI',
      companyNameEn: 'SSI Securities Corporation'
    },
    {
      code: 'ABB',
      companyName: 'Ngân hàng Thương mại Cổ phần An Bình',
      exchange: 'UPCOM',
      shortName: 'Ngân hàng An Bình',
      companyNameEn: 'An Binh Joint Stock Commercial Bank'
    },
    {
      code: 'SHB',
      companyName: 'Ngân hàng Thương mại Cổ phần Sài Gòn - Hà Nội ',
      exchange: 'HNX',
      shortName: 'Ngân hàng SG HN',
      companyNameEn: 'SaiGon Ha Noi Comercial Join Stock Bank'
    },
    {
      code: 'SVC',
      companyName: 'Công ty Cổ phần dịch vụ tổng hợp Sài Gòn ',
      exchange: 'HOSE',
      shortName: 'DV tổng hợp SG',
      companyNameEn: 'Sai Gon General Service Corporation'
    },
    {
      code: 'VIB',
      companyName: 'Ngân hàng Thương mại Cổ phần Quốc tế Việt Nam',
      exchange: 'HOSE',
      shortName: 'VIB Bank',
      companyNameEn: 'Vietnam International Commercial Joint Stock Bank'
    },
    {
      code: 'PNJ',
      companyName: 'Công ty Cổ phần Vàng bạc đá quý Phú Nhuận',
      exchange: 'HOSE',
      shortName: 'Vàng Phú Nhuận',
      companyNameEn: 'Phu Nhuan Jewelry Joint Stock Company'
    },
    {
      code: 'DVW',
      companyName: 'Công ty Cổ phần Dịch vụ và Xây dựng Cấp nước Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'DV cấp nc Đồng Nai',
      companyNameEn: 'Dong Nai Water Supply Construction and Services Joint Stock Company'
    },
    {
      code: 'BVS',
      companyName: 'Công ty Cổ phần Chứng khoán Bảo Việt',
      exchange: 'HNX',
      shortName: 'CK Bảo Việt',
      companyNameEn: 'Bao Viet Securities Joint Stock Company'
    },
    {
      code: 'SSC',
      companyName: 'Công ty Cổ phần Giống cây trồng miền Nam ',
      exchange: 'HNX',
      shortName: 'Giống cây miền Nam',
      companyNameEn: 'Southern Seed Joint-stock Company'
    },
    {
      code: 'TKU',
      companyName: 'Công ty Cổ phần Công nghiệp Tung Kuang',
      exchange: 'HNX',
      shortName: 'C.Nghiệp Tung Kuang',
      companyNameEn: 'Tung Kuang Industrial Joint Stock Company'
    },
    {
      code: 'EIB',
      companyName: 'Ngân hàng Thương mại Cổ phần Xuất nhập khẩu Việt Nam',
      exchange: 'HOSE',
      shortName: 'Eximbank',
      companyNameEn: 'VietNam Export - Import Commercial Joint Stock Bank'
    },
    {
      code: 'VCB',
      companyName: 'Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Vietcombank',
      companyNameEn: 'Joint Stock Commercial Bank For Foreign Trade Of Vietnam'
    },
    {
      code: 'ICT',
      companyName: 'Công ty cổ phần Viễn thông - Tin học Bưu điện',
      exchange: 'HOSE',
      shortName: 'Tin học Bưu điện',
      companyNameEn: 'JOINT STOCK COMPANY FOR TELECOMS AND INFORMATICS'
    },
    {
      code: 'FPT',
      companyName: 'Công ty Cổ phần FPT',
      exchange: 'HOSE',
      shortName: 'CTCP FPT',
      companyNameEn: 'FPT Corporation'
    },
    {
      code: 'CAV',
      companyName: 'Công ty Cổ phần dây cáp điện Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Dây cáp điện VN',
      companyNameEn: 'Vietnam electric cable corporation'
    },
    {
      code: 'VCC',
      companyName: 'Công ty Cổ phần Vinaconex 25',
      exchange: 'HNX',
      shortName: 'CTCP Vinaconex 25',
      companyNameEn: 'Vinaconex 25 Joint Stock Company'
    },
    {
      code: 'IMP',
      companyName: 'Công ty Cổ phần dược phẩm Imexpharm',
      exchange: 'HOSE',
      shortName: 'Dược Imexpharm',
      companyNameEn: 'Imexpharm Pharmaceutical Joint Stock Company'
    },
    {
      code: 'MKP',
      companyName: 'Công ty Cổ phần Hóa - Dược phẩm Mekophar',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm Mekophar',
      companyNameEn: 'Mekophar Chemical Pharmaceutical Joint Stock Company'
    },
    {
      code: 'DVN',
      companyName: 'Tổng công ty Dược Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'Dược Việt Nam',
      companyNameEn: 'Vietnam Pharmaceutical Corporation - Joint stock company'
    },
    {
      code: 'DP2',
      companyName: 'Công ty Cổ phần Dược phẩm Trung ương 2',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm TW 2',
      companyNameEn: 'Central Pharmaceutical Joint stock company No2'
    },
    {
      code: 'DMC',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Y tế Domesco',
      exchange: 'HOSE',
      shortName: 'XNK Y tế Domesco',
      companyNameEn: 'Domesco Medical Import - Export  Joint Stock Corporation'
    },
    {
      code: 'HVN',
      companyName: 'Tổng Công ty Hàng không Việt Nam - CTCP',
      exchange: 'HOSE',
      shortName: 'Vietnam Airlines',
      companyNameEn: 'Vietnam Airlines JSC'
    },
    {
      code: 'VSF',
      companyName: 'Tổng Công ty Lương thực Miền Nam – Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'L.thực miền Nam',
      companyNameEn: 'Vietnam Southern Food Corporation - Joint Stock Company'
    },
    {
      code: 'MVN',
      companyName: 'Tổng Công ty Hàng hải Việt Nam – Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'Hàng hải Việt Nam',
      companyNameEn: 'Vietnam National Shipping Lines'
    },
    {
      code: 'HNB',
      companyName: 'Công ty Cổ phần Bến xe Hà Nội ',
      exchange: 'UPCOM',
      shortName: 'CTCP Bến xe Hà Nội',
      companyNameEn: 'Hanoi Transport Station Joint Stock Company'
    },
    {
      code: 'IFS',
      companyName: 'Công ty Cổ phần Thực phẩm Quốc Tế',
      exchange: 'UPCOM',
      shortName: 'Thực phẩm Quốc tế',
      companyNameEn: 'Interfood Shareholding Company'
    },
    {
      code: 'SGC',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Sa Giang',
      exchange: 'HNX',
      shortName: 'XNK Sa Giang',
      companyNameEn: 'Sa Giang Import Export Corporation'
    },
    {
      code: 'VTS',
      companyName: 'Công ty Cổ phần Viglacera Từ Sơn ',
      exchange: 'HNX',
      shortName: 'Viglacera Từ Sơn',
      companyNameEn: 'Viglacera Tu Son Ceramic Joint Stock Company'
    },
    {
      code: 'STP',
      companyName: 'Công ty Cổ phần công nghiệp thương mại Sông Đà',
      exchange: 'HNX',
      shortName: 'CN T.mại Sông Đà',
      companyNameEn: 'Song Da Industry Trade joint stock company'
    },
    {
      code: 'CTB',
      companyName: 'Công ty Cổ phần Chế tạo Bơm Hải Dương ',
      exchange: 'HNX',
      shortName: 'Bơm Hải Dương',
      companyNameEn: 'Hai Duong Pump Manufacturing Joint Stock Company'
    },
    {
      code: 'DHG',
      companyName: 'Công ty Cổ phần Dược Hậu Giang',
      exchange: 'HOSE',
      shortName: 'Dược Hậu Giang',
      companyNameEn: 'DHG Pharmaceutical Joint – Stock Company'
    },
    {
      code: 'ITA',
      companyName: 'Công ty Cổ phần Đầu tư và Công nghiệp Tân Tạo ',
      exchange: 'HOSE',
      shortName: 'Đ.tư & CN Tân Tạo',
      companyNameEn: 'Tan Tao Investment Industry Corporation'
    },
    {
      code: 'SVI',
      companyName: 'Công ty Cổ phần Bao bì Biên Hòa',
      exchange: 'HOSE',
      shortName: 'Bao bì Biên Hòa',
      companyNameEn: 'Bien Hoa Packaging Company'
    },
    {
      code: 'DBW',
      companyName: 'Công ty Cổ phần Cấp nước Điện Biên',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Điện Biên',
      companyNameEn: 'Dien Bien Water Supply Joint Stock Company'
    },
    {
      code: 'ALT',
      companyName: 'Công ty Cổ phần văn hoá Tân Bình ',
      exchange: 'HNX',
      shortName: 'Văn hoá Tân Bình',
      companyNameEn: 'Alta Company'
    },
    {
      code: 'OPC',
      companyName: 'Công ty Cổ phần Dược phẩm OPC ',
      exchange: 'HOSE',
      shortName: 'Dược phẩm OPC',
      companyNameEn: 'OPC Pharmaceutical Joint Stock Company'
    },
    {
      code: 'CLC',
      companyName: 'Công ty Cổ phần Cát Lợi',
      exchange: 'HOSE',
      shortName: 'CTCP Cát Lợi',
      companyNameEn: 'Cat Loi Joint Stock Company'
    },
    {
      code: 'THT',
      companyName: 'Công ty Cổ phần than Hà Tu – Vinacomin',
      exchange: 'HNX',
      shortName: 'Than Hà Tu',
      companyNameEn: 'Vinacomin - Ha Tu Coal Joint Stock Company'
    },
    {
      code: 'ICN',
      companyName: 'Công ty Cổ phần Đầu Tư Xây Dựng Dầu Khí IDICO ',
      exchange: 'UPCOM',
      shortName: 'Dầu Khí IDICO',
      companyNameEn: 'IDICO Investment Construction Oil And Natural Gas Joint Stock Company'
    },
    {
      code: 'AMP',
      companyName: 'Công ty Cổ phần Armephaco',
      exchange: 'UPCOM',
      shortName: 'CTCP Armephaco',
      companyNameEn: 'Armephaco Joint Stock Company'
    },
    {
      code: 'VEC',
      companyName: 'Tổng Công ty Cổ phần Điện tử và Tin học Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Điện tử Tin học VN',
      companyNameEn: 'Vietnam Electronics and Informatics Joint Stock Corporation'
    },
    {
      code: 'VNA',
      companyName: 'Công ty Cổ phần vận tải biển VINASHIP ',
      exchange: 'UPCOM',
      shortName: 'V.tải VINASHIP',
      companyNameEn: 'VINASHIP Joint Stock Company'
    },
    {
      code: 'SPH',
      companyName: 'Công ty Cổ phần xuất nhập khẩu thủy sản Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Thủy sản Hà Nội',
      companyNameEn: 'Ha Noi seaproducts import export joint stock company'
    },
    {
      code: 'STG',
      companyName: 'Công ty Cổ phần Kho vận miền Nam',
      exchange: 'HOSE',
      shortName: 'Kho vận miền Nam',
      companyNameEn: 'South Logistics Joint Stock Company'
    },
    {
      code: 'PTC',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng Bưu điện',
      exchange: 'HOSE',
      shortName: 'ĐT XD Bưu điện',
      companyNameEn: 'Post and Telecommunications Investment and Construction JSC'
    },
    {
      code: 'SPD',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Thủy sản miền Trung ',
      exchange: 'UPCOM',
      shortName: 'T.sản miền Trung',
      companyNameEn: 'DaNang Seaproducts Import Export Join Stock Corporation'
    },
    {
      code: 'TC6',
      companyName: 'Công ty Cổ phần Than Cọc Sáu - VINACOMIN ',
      exchange: 'HNX',
      shortName: 'Than Cọc Sáu',
      companyNameEn: 'Vinacomin - Coc Sau Coal Joint Stock Company'
    },
    {
      code: 'VCG',
      companyName: 'Tổng Công ty Cổ phần Xuất nhập khẩu và xây dựng Việt Nam ',
      exchange: 'HOSE',
      shortName: 'XNK & Xây dựng VN',
      companyNameEn: 'Vietnam Construction and Import - Export Joint Stock Corporation'
    },
    {
      code: 'MNB',
      companyName: 'Tổng công ty May Nhà Bè - Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'May Nhà Bè',
      companyNameEn: 'Nha Be Garment Corporation Joint Stock Company'
    },
    {
      code: 'TXM',
      companyName: 'Công ty Cổ phần VICEM Thạch cao Xi măng',
      exchange: 'HNX',
      shortName: 'Thạch cao Xi măng',
      companyNameEn: 'Gypsum and Cement VICEM Joint Stock Company'
    },
    {
      code: 'TDN',
      companyName: 'Công ty Cổ phần Than Đèo Nai - VINACOMIN ',
      exchange: 'HNX',
      shortName: 'Than Đèo Nai',
      companyNameEn: 'Vinacomin-DeoNai Coal Joint Stock Company'
    },
    {
      code: 'SSN',
      companyName: 'Công ty Cổ phần xuất nhập khẩu thủy sản Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'XNK thủy sản SG',
      companyNameEn: 'Sai Gon seaproducts import export joint stock company'
    },
    {
      code: 'VLF',
      companyName: 'Công ty Cổ phần Lương thực thực phẩm Vĩnh Long',
      exchange: 'UPCOM',
      shortName: 'L.thực Vĩnh Long',
      companyNameEn: 'Vinh Long Cereal And Food Import Export Joint Stock Company'
    },
    {
      code: 'TTT',
      companyName: 'Công ty Cổ phần Du lịch - Thương mại Tây Ninh',
      exchange: 'HNX',
      shortName: 'T.mại Tây Ninh',
      companyNameEn: 'Tay Ninh Tourist - Trading Joint Stock Company'
    },
    {
      code: 'UDC',
      companyName: 'Công ty Cổ phần Xây dựng và Phát triển đô thị Bà Rịa - Vũng Tàu',
      exchange: 'HOSE',
      shortName: 'Đô thị Bà Rịa VT',
      companyNameEn: 'Urban Development and Construction Corporation'
    },
    {
      code: 'CMF',
      companyName: 'Công ty cổ phần Thực phẩm Cholimex',
      exchange: 'UPCOM',
      shortName: 'Th.phẩm CHOLIMEX',
      companyNameEn: 'Cholimex Food Joint Stock Company'
    },
    {
      code: 'TDW',
      companyName: 'Công ty Cổ phần Cấp nước Thủ Đức',
      exchange: 'HOSE',
      shortName: 'Cấp nc Thủ Đức',
      companyNameEn: 'Thu Duc Water Supply Joint Stock Company'
    },
    {
      code: 'GDW',
      companyName: 'Công ty Cổ phần Cấp nước Gia Định',
      exchange: 'HNX',
      shortName: 'Cấp nc Gia Định',
      companyNameEn: 'Gia Dinh Water Supply Joint Stock Company'
    },
    {
      code: 'DTV',
      companyName: 'Công ty Cổ phần Phát triển Điện Trà Vinh',
      exchange: 'UPCOM',
      shortName: 'Điện Trà Vinh',
      companyNameEn: 'Tra Vinh Electric Development Joint Stock Corporation'
    },
    {
      code: 'TIX',
      companyName: 'Công ty Cổ phần Sản xuất Kinh doanh Xuất nhập khẩu Dịch vụ và Đầu tư Tân Bình ',
      exchange: 'HOSE',
      shortName: 'Đầu tư Tân Bình',
      companyNameEn: 'Tan Binh Import - Export Joint Stock Corporation'
    },
    {
      code: 'PJS',
      companyName: 'Công ty Cổ phần cấp nước Phú Hòa Tân',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Phú Hòa Tân',
      companyNameEn: 'Phu Hoa Tan water supply joint stock company'
    },
    {
      code: 'CLW',
      companyName: 'Công ty Cổ phần Cấp nước Chợ Lớn ',
      exchange: 'HOSE',
      shortName: 'Cấp nc Chợ Lớn',
      companyNameEn: 'Cho Lon Water Supply Joint Stock Company'
    },
    {
      code: 'LGM',
      companyName: 'Công ty Cổ phần Giày da và May mặc Xuất khẩu (LEGAMEX)',
      exchange: 'UPCOM',
      shortName: 'Giày da và May mặc Xuất khẩu (LEGAMEX)',
      companyNameEn: 'Legamex company'
    },
    {
      code: 'TCM',
      companyName: 'Công ty Cổ phần Dệt may - Đầu tư - Thương mại Thành Công ',
      exchange: 'HOSE',
      shortName: 'May Thành Công',
      companyNameEn: 'Thanh Cong Textile Garment Investment Trading Joint Stock Company'
    },
    {
      code: 'KSB',
      companyName: 'Công ty Cổ phần Khoáng sản và Xây dựng Bình Dương',
      exchange: 'HOSE',
      shortName: 'K.sản Bình Dương',
      companyNameEn: 'Binh Duong Mineral And Construction Joint Stock Company'
    },
    {
      code: 'VDL',
      companyName: 'Công ty Cổ phần Thực phẩm Lâm Đồng ',
      exchange: 'HNX',
      shortName: 'Th.phẩm Lâm Đồng',
      companyNameEn: 'LamDong Foodstuffs Joint Stock Company'
    },
    {
      code: 'HOT',
      companyName: 'Công ty Cổ phần Du lịch-Dịch vụ Hội An',
      exchange: 'HOSE',
      shortName: 'Du lịch DV Hội An',
      companyNameEn: 'Hoi An Tourist Service Joint Stock Company'
    },
    {
      code: 'PET',
      companyName: 'Tổng Công ty Cổ phần Dịch vụ Tổng hợp Dầu khí ',
      exchange: 'HOSE',
      shortName: 'DV Tổng hợp D.khí',
      companyNameEn: 'Petrovietnam General Services Js Corporation'
    },
    {
      code: 'HLB',
      companyName: 'Công ty Cổ phần Bia và Nước giải khát Hạ Long',
      exchange: 'UPCOM',
      shortName: 'Bia Hạ Long',
      companyNameEn: 'Halong Beer And Beverage Joint Stock Company'
    },
    {
      code: 'VTG',
      companyName: 'Công ty Cổ phần du lịch tỉnh Bà Rịa - Vũng Tàu',
      exchange: 'UPCOM',
      shortName: 'D.lịch B.Rịa V.Tàu',
      companyNameEn: 'Ba Ria - Vung Tau tourist joint stock corporation'
    },
    {
      code: 'ICC',
      companyName: 'Công ty cổ phần Xây dựng Công nghiệp',
      exchange: 'UPCOM',
      shortName: 'CTCP XD C.nghiệp',
      companyNameEn: 'Industrial Construction Joint Stock Company'
    },
    {
      code: 'PIT',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Petrolimex',
      exchange: 'HOSE',
      shortName: 'XNK Petrolimex',
      companyNameEn: 'Petrolimex International Trading Joint Stock Company'
    },
    {
      code: 'CMN',
      companyName: 'Công ty Cổ phần Lương thực thực phẩm Colusa - Miliket',
      exchange: 'UPCOM',
      shortName: 'Th.phẩm Miliket',
      companyNameEn: 'Colusa-Miliket Foodstuff Joint stock company'
    },
    {
      code: 'VPS',
      companyName: 'Công ty Cổ phần thuốc sát trùng Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Thuốc sát trùng VN',
      companyNameEn: 'Vietnam pesticide joint stock company'
    },
    {
      code: 'VTD',
      companyName: 'Công ty Cổ phần Du lịch Vietourist',
      exchange: 'UPCOM',
      shortName: 'Du lịch Vietourist',
      companyNameEn: 'Vietourist Travel Joint Stock Company'
    },
    {
      code: 'SPA',
      companyName: 'Công ty cổ phần Bao bì Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Bao bì Sài Gòn',
      companyNameEn: 'SaiGon Packaging Joint Stock Company'
    },
    {
      code: 'KMT',
      companyName: 'Công ty Cổ phần Kim khí Miền Trung ',
      exchange: 'HNX',
      shortName: 'Kim khí Miền Trung',
      companyNameEn: 'Central Vietnam Metal Corporation'
    },
    {
      code: 'SD9',
      companyName: 'Công ty Cổ phần Sông Đà 9',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 9',
      companyNameEn: 'Song Da No 9 Joint Stock Company'
    },
    {
      code: 'HMC',
      companyName: 'Công ty Cổ phần Kim khí Thành phố Hồ Chí Minh - VNSTEEL',
      exchange: 'HOSE',
      shortName: 'Kim khí HCM',
      companyNameEn: 'VNSTEEL - HoChiMinh City Metal Corporation'
    },
    {
      code: 'DXL',
      companyName: 'Công ty Cổ phần Du lịch và Xuất nhập khẩu Lạng Sơn ',
      exchange: 'UPCOM',
      shortName: 'XNK Lạng Sơn',
      companyNameEn: 'Lang Son Tourism And Import – Export Joint Stock Company'
    },
    {
      code: 'SDT',
      companyName: 'Công ty Cổ phần Sông Đà 10 ',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 10',
      companyNameEn: 'Song Da No 10 Joint Stock Company'
    },
    {
      code: 'HMG',
      companyName: 'Công ty Cổ phần kim khí Hà Nội - VNSTEEL',
      exchange: 'UPCOM',
      shortName: 'Kim khí Hà Nội',
      companyNameEn: 'VNSTEEL - Hanoisteel corporation'
    },
    {
      code: 'D2D',
      companyName: 'Công ty Cổ phần Phát triển Đô thị Công nghiệp Số 2 ',
      exchange: 'HOSE',
      shortName: 'Đô thị C.nghiệp 2',
      companyNameEn: 'Industrial Urban Development Joint Stock Company No. 2'
    },
    {
      code: 'BMS',
      companyName: 'Công ty Cổ phần Chứng Khoán Bảo Minh',
      exchange: 'UPCOM',
      shortName: 'CK Bảo Minh',
      companyNameEn: 'Bao Minh Securities Company'
    },
    {
      code: 'FOX',
      companyName: 'Công ty Cổ phần Viễn thông FPT',
      exchange: 'UPCOM',
      shortName: 'Viễn thông FPT',
      companyNameEn: 'FPT Telecom Joint Stock Company'
    },
    {
      code: 'PVC',
      companyName: 'Tổng công ty Hóa chất và Dịch vụ Dầu khí - CTCP (PVChem)',
      exchange: 'HNX',
      shortName: 'Hóa chất & DV dầu khí',
      companyNameEn: 'Petrovietnam Chemical and Services Corporation'
    },
    {
      code: 'TRC',
      companyName: 'Công ty Cổ phần Cao su Tây Ninh',
      exchange: 'HOSE',
      shortName: 'Cao su Tây Ninh',
      companyNameEn: 'Tay Ninh Rubber Joint Stock Company'
    },
    {
      code: 'BRC',
      companyName: 'Công ty Cổ phần Cao su Bến Thành ',
      exchange: 'HOSE',
      shortName: 'Cao su Bến Thành',
      companyNameEn: 'Ben Thanh Rubber Joint Stock Company'
    },
    {
      code: 'IME',
      companyName: 'Công ty Cổ phần Cơ khí và Xây lắp Công nghiệp ',
      exchange: 'UPCOM',
      shortName: 'Cơ khí C.Nghiệp',
      companyNameEn: 'Mechanical and Industrial construction Joint Stock Company'
    },
    {
      code: 'DPR',
      companyName: 'Công ty Cổ phần Cao su Đồng Phú',
      exchange: 'HOSE',
      shortName: 'Cao su Đồng Phú',
      companyNameEn: 'Dong Phu Rubber Joint Stock Company'
    },
    {
      code: 'LBE',
      companyName: 'Công ty Cổ phần Sách và Thiết bị trường học Long An',
      exchange: 'HNX',
      shortName: 'Sách Long An',
      companyNameEn: 'Long An School Book and Equipment Joint Stock Company'
    },
    {
      code: 'TRA',
      companyName: 'Công ty Cổ phần Traphaco ',
      exchange: 'HOSE',
      shortName: 'CTCP Traphaco',
      companyNameEn: 'Traphaco Joint Stock Company'
    },
    {
      code: 'DDN',
      companyName: 'Công ty Cổ phần Dược - Thiết bị y tế Đà Nẵng (DDN)',
      exchange: 'UPCOM',
      shortName: 'T.bị y tế Đà Nẵng',
      companyNameEn: 'Danang Pharmaceutical Medical Equipment Joint Stock Company'
    },
    {
      code: 'NSC',
      companyName: 'Công ty Cổ phần Giống cây trồng Trung Ương ',
      exchange: 'HNX',
      shortName: 'Giống cây trồng TW',
      companyNameEn: 'National Seed JSC'
    },
    {
      code: 'HAI',
      companyName: 'Công ty Cổ phần Nông dược H.A.I',
      exchange: 'HOSE',
      shortName: 'Nông dược H.A.I',
      companyNameEn: 'H.A.I Agrochem Join Stock Company'
    },
    {
      code: 'CJC',
      companyName: 'Công ty Cổ phần Cơ điện Miền Trung (CEMC)',
      exchange: 'HNX',
      shortName: 'Cơ điện M.Trung',
      companyNameEn: 'Central Area Electrical Mechanical Joint Stock Company'
    },
    {
      code: 'HTP',
      companyName: 'Công ty Cổ phần In sách giáo khoa Hòa Phát',
      exchange: 'HNX',
      shortName: 'In SGK Hòa Phát',
      companyNameEn: 'Hoa Phat Textbook Printing Joint Stock Company'
    },
    {
      code: 'ICF',
      companyName: 'Công ty Cổ phần Đầu tư Thương mại Thủy sản ',
      exchange: 'UPCOM',
      shortName: 'Đ.tư T.mại Th.sản',
      companyNameEn: 'Investment Commerce Fisheries Corporation'
    },
    {
      code: 'LTC',
      companyName: 'Công ty Cổ phần Điện nhẹ Viễn thông',
      exchange: 'UPCOM',
      shortName: 'Điện nhẹ V.thông',
      companyNameEn: 'Low Current - Telecom Joint Stock Company'
    },
    {
      code: 'MEC',
      companyName: 'Công ty Cổ phần cơ khí - lắp máy Sông Đà',
      exchange: 'UPCOM',
      shortName: 'Cơ khí - lắp máy Sông Đà',
      companyNameEn: 'Song Da Mechanical - Asembling Joint Stock Company'
    },
    {
      code: 'PTS',
      companyName: 'Công ty Cổ phần Vận tải và Dịch vụ Petrolimex Hải Phòng',
      exchange: 'HNX',
      shortName: 'V.tải Petro H.Phòng',
      companyNameEn: 'Hai Phong Petrolimex Transportation and Services Joint Stock Company'
    },
    {
      code: 'SAP',
      companyName: 'Công ty Cổ phần In sách giáo khoa TP Hồ Chí Minh ',
      exchange: 'UPCOM',
      shortName: 'Sách giáo khoa HCM',
      companyNameEn: 'Textbook Printing Joint Stock Company In Ho Chi Minh City'
    },
    {
      code: 'SJE',
      companyName: 'Công ty Cổ phần Sông Đà 11 ',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 11',
      companyNameEn: 'Song Da No 11 Joint Stock Company'
    },
    {
      code: 'TLT',
      companyName: 'Công ty Cổ phần Viglacera Thăng Long',
      exchange: 'UPCOM',
      shortName: 'Viglacera Th.Long',
      companyNameEn: 'Viglacera Thanglong Tiles JSC'
    },
    {
      code: 'TPH',
      companyName: 'Công ty Cổ phần In Sách Giáo Khoa tại TP Hà Nội',
      exchange: 'HNX',
      shortName: 'Sách giáo khoa HN',
      companyNameEn: 'Ha Noi Textbooks Printing Joint - Stock Company'
    },
    {
      code: 'VC2',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng VINA2',
      exchange: 'HNX',
      shortName: 'Xây dựng VINA2',
      companyNameEn: 'VINA2 Investment and Construction Joint Stock Company'
    },
    {
      code: 'VMC',
      companyName: 'Công ty Cổ phần VIMECO',
      exchange: 'HNX',
      shortName: 'CTCP VIMECO',
      companyNameEn: 'Vimeco Joint Stock Company'
    },
    {
      code: 'VTV',
      companyName: 'CÔNG TY CỔ PHẦN NĂNG LƯỢNG VÀ MÔI TRƯỜNG VICEM',
      exchange: 'HNX',
      shortName: 'N.lượng & M.trg VICEM',
      companyNameEn: 'VICEM ENERGY AND ENVIRONMENT JOINT STOCK COMPANY'
    },
    {
      code: 'DPG',
      companyName: 'Công ty Cổ phần Đạt Phương',
      exchange: 'HOSE',
      shortName: 'CTCP Đạt Phương',
      companyNameEn: 'Dat Phuong Joint Stock Company'
    },
    {
      code: 'TCT',
      companyName: 'Công ty Cổ phần Cáp treo Núi Bà Tây Ninh ',
      exchange: 'HOSE',
      shortName: 'Cáp treo Tây Ninh',
      companyNameEn: 'Tay Ninh Cable Car Tour Company'
    },
    {
      code: 'VNE',
      companyName: 'Tổng Công ty Cổ phần Xây dựng điện Việt Nam',
      exchange: 'HOSE',
      shortName: 'Xây dựng điện VN',
      companyNameEn: 'Vietnam Electricity Construction Joint-stock Corporation'
    },
    {
      code: 'VC1',
      companyName: 'Công ty Cổ phần Xây dựng số 1 ',
      exchange: 'HNX',
      shortName: 'CTCP xây dựng số 1',
      companyNameEn: 'Construction Joint Stock Company No 1'
    },
    {
      code: 'SAB',
      companyName: 'Tổng Công ty Cổ phần Bia - Rượu - Nước giải khát Sài Gòn',
      exchange: 'HOSE',
      shortName: 'SABECO',
      companyNameEn: 'Saigon Beer – Alcohol – Beverage Corporation'
    },
    {
      code: 'TCI',
      companyName: 'Công ty cổ phần Chứng khoán Thành Công',
      exchange: 'UPCOM',
      shortName: 'CK Thành Công',
      companyNameEn: 'ThanhCong Securities Company'
    },
    {
      code: 'CMC',
      companyName: 'Công ty Cổ phần Đầu tư CMC ',
      exchange: 'HNX',
      shortName: 'CTCP Đầu tư CMC',
      companyNameEn: 'Cmc Investment Joint Stock Company'
    },
    {
      code: 'CTN',
      companyName: 'Công ty Cổ phần Xây dựng Công trình ngầm ',
      exchange: 'UPCOM',
      shortName: 'XD Công trình ngầm',
      companyNameEn: 'Underground Works Construction Joint Stock Company - VINAVICO'
    },
    {
      code: 'DTC',
      companyName: 'Công ty Cổ phần Viglacera Đông Triều',
      exchange: 'UPCOM',
      shortName: 'Viglacera Đông Triều',
      companyNameEn: 'Dong Trieu Viglacera JSC'
    },
    {
      code: 'EBS',
      companyName: 'Công ty Cổ phần Sách Giáo Dục tại TP Hà Nội',
      exchange: 'HNX',
      shortName: 'Sách Giáo Dục HN',
      companyNameEn: 'Educational Book Joint Stock Company In Hanoi city'
    },
    {
      code: 'HJS',
      companyName: 'Công ty Cổ phần Thủy điện Nậm Mu ',
      exchange: 'HNX',
      shortName: 'Th.điện Nậm Mu',
      companyNameEn: 'Nam Mu Hydropower Joint Stock Company'
    },
    {
      code: 'HLY',
      companyName: 'Công ty Cổ phần Viglacera Hạ Long I',
      exchange: 'HNX',
      shortName: 'Viglacera Hạ Long I',
      companyNameEn: 'Ha Long I - Viglacera JSC'
    },
    {
      code: 'MCO',
      companyName: 'Công ty Cổ phần MCO Việt Nam',
      exchange: 'HNX',
      shortName: 'CTCP MCO Việt Nam',
      companyNameEn: 'BDC Vietnam Join Stock Company'
    },
    {
      code: 'PAN',
      companyName: 'Công ty Cổ phần Tập đoàn PAN',
      exchange: 'HOSE',
      shortName: 'CTCP Tập đoàn PAN',
      companyNameEn: 'Pan Pacific Corporation'
    },
    {
      code: 'PJC',
      companyName: 'Công ty Cổ phần Thương mại và Vận tải Petrolimex Hà Nội',
      exchange: 'HNX',
      shortName: 'V.tải Petro HN',
      companyNameEn: 'Petrolimex Ha Noi Transportation and Trading Joint-Stock Company.'
    },
    {
      code: 'POT',
      companyName: 'Công ty Cổ phần Thiết bị Bưu Điện',
      exchange: 'HNX',
      shortName: 'Thiết bị Bưu Điện',
      companyNameEn: 'Post and Telecommunication Equipment Factory'
    },
    {
      code: 'S55',
      companyName: 'Công ty Cổ phần Sông Đà 505',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 505',
      companyNameEn: 'Song Da 505 Joint Stock Company'
    },
    {
      code: 'S99',
      companyName: 'Công ty Cổ phần SCI',
      exchange: 'HNX',
      shortName: 'CTCP SCI',
      companyNameEn: 'SCI Joint Stock Company'
    },
    {
      code: 'SCC',
      companyName: 'Công ty Cổ phần Đầu tư thương mại Hưng Long Tỉnh Hòa Bình',
      exchange: 'UPCOM',
      shortName: 'T.mại Hưng Long',
      companyNameEn: 'HOABINH PROVINCE HUNGLONG TRADING INVESTMENT JOINT STOCK COMPANY'
    },
    {
      code: 'SD3',
      companyName: 'Công ty Cổ phần Sông Đà 3',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 3',
      companyNameEn: 'Song Da 3 Joint Stock Company'
    },
    {
      code: 'SD6',
      companyName: 'Công ty Cổ phần Sông Đà 6',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 6',
      companyNameEn: 'Songda 6 Joint Stock Company'
    },
    {
      code: 'SDA',
      companyName: 'Công ty Cổ phần Simco Sông Đà ',
      exchange: 'HNX',
      shortName: 'CTCP Simco Sông Đà',
      companyNameEn: 'Simco Songda Joint Stock Company'
    },
    {
      code: 'SDC',
      companyName: 'Công ty Cổ phần Tư vấn sông Đà',
      exchange: 'HNX',
      shortName: 'Tư vấn sông Đà',
      companyNameEn: 'Song Da Consulting Joint Stock Company'
    },
    {
      code: 'SDY',
      companyName: 'Công ty Cổ phần Xi măng Elecem',
      exchange: 'UPCOM',
      shortName: 'Xi măng Elecem',
      companyNameEn: 'Elecem Cement Joint Stock Company'
    },
    {
      code: 'VNC',
      companyName: 'Công ty Cổ phần Tập đoàn Vinacontrol',
      exchange: 'HNX',
      shortName: 'TĐ Vinacontrol',
      companyNameEn: 'The Vietnam Superintendence and Inspection JSC'
    },
    {
      code: 'DNP',
      companyName: 'Công ty Cổ phần Nhựa Đồng Nai ',
      exchange: 'HNX',
      shortName: 'CTCP Nhựa Đồng Nai',
      companyNameEn: 'DongNai Plastic Joint Stock Company'
    },
    {
      code: 'DTT',
      companyName: 'Công ty Cổ phần Kỹ nghệ Đô Thành ',
      exchange: 'HOSE',
      shortName: 'Kỹ nghệ Đô Thành',
      companyNameEn: 'Do Thanh Technology Corporation'
    },
    {
      code: 'GMC',
      companyName: 'Công ty cổ phần Garmex Sài Gòn',
      exchange: 'HOSE',
      shortName: 'Garmex Sài Gòn',
      companyNameEn: 'Garmex Saigon Corporation'
    },
    {
      code: 'LBM',
      companyName: 'Công ty Cổ phần Khoáng sản và Vật liệu Xây dựng Lâm Đồng',
      exchange: 'HOSE',
      shortName: 'VLXD Lâm Đồng',
      companyNameEn: 'Lamdong Minerals and Building materials Join Stock Company'
    },
    {
      code: 'VGP',
      companyName: 'Công ty Cổ phần Cảng rau quả',
      exchange: 'HNX',
      shortName: 'Cảng rau quả',
      companyNameEn: 'The Vegetexco Port Joint Stock Company'
    },
    {
      code: 'VID',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Thương mại Viễn Đông',
      exchange: 'HOSE',
      shortName: 'T.mại Viễn Đông',
      companyNameEn: 'Vien Dong Investment Development Trading Corporation'
    },
    {
      code: 'VIS',
      companyName: 'Công ty Cổ phần Thép Việt Ý',
      exchange: 'HOSE',
      shortName: 'Thép Việt Ý',
      companyNameEn: 'Vietnam - Itaty Steel JSC'
    },
    {
      code: 'HAX',
      companyName: 'Công ty Cổ phần Dịch vụ Ô tô Hàng Xanh',
      exchange: 'HOSE',
      shortName: 'DV Ô tô Hàng Xanh',
      companyNameEn: 'Hang Xanh Motors Service JSC'
    },
    {
      code: 'TMC',
      companyName: 'Công ty Cổ phần Thương mại Xuất nhập khẩu Thủ Đức',
      exchange: 'HNX',
      shortName: 'T.mại XNK Thủ Đức',
      companyNameEn: 'THUDUC TRADING OIL AND GAS PETROLEUM JOINT STOCK COMPANY.'
    },
    {
      code: 'HRC',
      companyName: 'Công ty Cổ phần Cao su Hòa Bình',
      exchange: 'HOSE',
      shortName: 'Cao su Hòa Bình',
      companyNameEn: 'Hoa Binh Rubber Joint Stock Company'
    },
    {
      code: 'AUM',
      companyName: 'Công ty Cổ phần Vinacafe Sơn Thành',
      exchange: 'UPCOM',
      shortName: 'Vinacafe Sơn Thành',
      companyNameEn: 'VINACAFE SON THANH JOINT STOCK COMPANY'
    },
    {
      code: 'MPC',
      companyName: 'Công ty cổ phần Tập đoàn Thủy sản Minh Phú',
      exchange: 'UPCOM',
      shortName: 'Thủy sản Minh Phú',
      companyNameEn: 'Minh Phu Seafood Joint Stock Company'
    },
    {
      code: 'PLC',
      companyName: 'Tổng Công ty Hóa dầu Petrolimex - CTCP',
      exchange: 'HNX',
      shortName: 'Hóa dầu Petrolimex',
      companyNameEn: 'Petrolimex Petrochemical Corporation - JSC'
    },
    {
      code: 'SD5',
      companyName: 'Công ty Cổ phần Sông Đà 5',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 5',
      companyNameEn: 'Song Da 5 Joint Stock Company'
    },
    {
      code: 'SD7',
      companyName: 'Công ty Cổ phần Sông Đà 7',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 7',
      companyNameEn: 'Songda 7 Joint Stock Company'
    },
    {
      code: 'SIC',
      companyName: 'Công ty Cổ phần ANI',
      exchange: 'HNX',
      shortName: 'CTCP ANI',
      companyNameEn: 'ANI Joint Stock Company'
    },
    {
      code: 'STC',
      companyName: 'Công ty Cổ phần Sách và Thiết bị trường học TP Hồ Chí Minh ',
      exchange: 'HNX',
      shortName: 'Sách T.bị HCM',
      companyNameEn: 'Book and Educational Equipment Joint Stock Company.'
    },
    {
      code: 'TCO',
      companyName: 'Công ty Cổ phần Vận tải đa phương thức Duyên Hải ',
      exchange: 'HOSE',
      shortName: 'V.tải Duyên Hải',
      companyNameEn: 'Duyen Hai Multi Modal Transport Joint Stock Company'
    },
    {
      code: 'VTA',
      companyName: 'Công ty Cổ phần Vitaly',
      exchange: 'UPCOM',
      shortName: 'CTCP Vitaly',
      companyNameEn: 'Vitaly Joint Stock Company'
    },
    {
      code: 'DCL',
      companyName: 'Công ty Cổ phần Dược phẩm Cửu Long ',
      exchange: 'HOSE',
      shortName: 'Dược phẩm Cửu Long',
      companyNameEn: 'Benovas Pharmaceutical Company'
    },
    {
      code: 'IKH',
      companyName: 'Công ty cổ phần In Khoa học Kỹ thuật',
      exchange: 'UPCOM',
      shortName: 'In Khoa học KT',
      companyNameEn: 'The Scientific Technical Printing Joint Stock Company'
    },
    {
      code: 'BMC',
      companyName: 'Công ty Cổ phần Khoáng sản Bình Định',
      exchange: 'HOSE',
      shortName: 'K.sản Bình Định',
      companyNameEn: 'Binh Dinh Minerals Joint Stock Company'
    },
    {
      code: 'SAF',
      companyName: 'Công ty Cổ phần Lương thực Thực phẩm SAFOCO',
      exchange: 'HNX',
      shortName: 'Th.phẩm SAFOCO',
      companyNameEn: 'Safoco Foodstuff Joint Stock Company'
    },
    {
      code: 'SD4',
      companyName: 'Công ty Cổ phần Sông Đà 4',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 4',
      companyNameEn: 'Song Da 4 Joint Stock Company'
    },
    {
      code: 'DAE',
      companyName: 'Công ty Cổ phần Sách Giáo Dục tại TP Đà Nẵng',
      exchange: 'HNX',
      shortName: 'Sách Giaó dục ĐN',
      companyNameEn: 'Educational Book Joint Stock Company in Da Nang City'
    },
    {
      code: 'HNM',
      companyName: 'Công ty Cổ phần Sữa Hà Nội',
      exchange: 'UPCOM',
      shortName: 'CTCP Sữa Hà Nội',
      companyNameEn: 'Ha Noi Milk Joint Stock Company'
    },
    {
      code: 'NBC',
      companyName: 'Công ty Cổ phần Than Núi Béo - Vinacomin ',
      exchange: 'HNX',
      shortName: 'Than Núi Béo',
      companyNameEn: 'Vinacomin - Nui Beo Coal Joint Stock Company'
    },
    {
      code: 'NST',
      companyName: 'Công ty Cổ phần Ngân Sơn ',
      exchange: 'HNX',
      shortName: 'CTCP Ngân Sơn',
      companyNameEn: 'Ngan Son Joint Stock Company'
    },
    {
      code: 'PSC',
      companyName: 'Công ty Cổ phần Vận tải và Dịch vụ Petrolimex Sài Gòn ',
      exchange: 'HNX',
      shortName: 'V.tải Petro SG',
      companyNameEn: 'Sai Gon Petrolimex Transportation and Service Joint Stock Company'
    },
    {
      code: 'VBH',
      companyName: 'Công ty Cổ phần Điện tử Bình Hòa',
      exchange: 'UPCOM',
      shortName: 'Điện tử Bình Hòa',
      companyNameEn: 'Viettronics Binh Hoa Joint Stock Company'
    },
    {
      code: 'VFR',
      companyName: 'Công ty Cổ phần Vận tải và Thuê tàu - Vietfracht ',
      exchange: 'UPCOM',
      shortName: 'V.tải Vietfracht',
      companyNameEn: 'Transport and Chartering Corporation'
    },
    {
      code: 'DIC',
      companyName: 'Công ty Cổ phần Đầu tư và Thương mại DIC ',
      exchange: 'UPCOM',
      shortName: 'Đầu tư T.mại DIC',
      companyNameEn: 'DIC Investment and Trading Joint Stock Company'
    },
    {
      code: 'DRC',
      companyName: 'Công ty Cổ phần Cao Su Đà Nẵng',
      exchange: 'HOSE',
      shortName: 'Cao Su Đà Nẵng',
      companyNameEn: 'Da Nang Rubber Joint Stock Company'
    },
    {
      code: 'HBC',
      companyName: 'Công ty Cổ phần Tập đoàn Xây dựng Hòa Bình',
      exchange: 'HOSE',
      shortName: 'Xây dựng Hòa Bình',
      companyNameEn: 'Hoabinh Construction Group Joint Stock Company'
    },
    {
      code: 'HBD',
      companyName: 'Công ty Cổ phần Bao bì PP Bình Dương',
      exchange: 'UPCOM',
      shortName: 'Bao bì Bình Dương',
      companyNameEn: 'Binh Duong PP Pack Making Joint Stock Company'
    },
    {
      code: 'LGC',
      companyName: 'Công ty Cổ phần đầu tư cầu đường CII',
      exchange: 'HOSE',
      shortName: 'Cầu đường CII',
      companyNameEn: 'CII Bridges and Roads Investment Joint Stock Company'
    },
    {
      code: 'MCP',
      companyName: 'Công ty Cổ phần In và Bao bì Mỹ Châu',
      exchange: 'HOSE',
      shortName: 'Bao bì Mỹ Châu',
      companyNameEn: 'My Chau Printing & Packaging Holdings Co'
    },
    {
      code: 'PJT',
      companyName: 'Công ty Cổ phần Vận tải Xăng dầu Đường Thủy Petrolimex',
      exchange: 'HOSE',
      shortName: 'V.tải Đg Thủy Petro',
      companyNameEn: 'Petrolimex Joint Stock Tanker Company'
    },
    {
      code: 'SDN',
      companyName: 'Công ty Cổ phần Sơn Đồng Nai',
      exchange: 'HNX',
      shortName: 'CTCP Sơn Đồng Nai',
      companyNameEn: 'DongNai Paint Corporation'
    },
    {
      code: 'SFI',
      companyName: 'Công ty Cổ phần Đại lý Vận tải SAFI',
      exchange: 'HOSE',
      shortName: 'Đại lý V.tải SAFI',
      companyNameEn: 'Sea And Air Freight International'
    },
    {
      code: 'SFN',
      companyName: 'Công ty Cổ phần Dệt lưới Sài Gòn ',
      exchange: 'HNX',
      shortName: 'Dệt lưới Sài Gòn',
      companyNameEn: 'Saigon Fishing Net Joint Stock Company'
    },
    {
      code: 'SJ1',
      companyName: 'Công ty Cổ phần Nông nghiệp Hùng Hậu',
      exchange: 'HNX',
      shortName: 'N.nghiệp Hùng Hậu',
      companyNameEn: 'Hung Hau Agricultural Corporation'
    },
    {
      code: 'SJD',
      companyName: 'Công ty Cổ phần Thủy Điện Cần Đơn',
      exchange: 'HOSE',
      shortName: 'Th.Điện Cần Đơn',
      companyNameEn: 'Can Don Hydro Power Joint Stocks Company'
    },
    {
      code: 'TCR',
      companyName: 'Công ty Cổ phần Công Nghiệp Gốm sứ Taicera ',
      exchange: 'HOSE',
      shortName: 'Gốm sứ Taicera',
      companyNameEn: 'TAICERA Enterprise Co., Ltd.'
    },
    {
      code: 'VTB',
      companyName: 'Công ty Cổ phần Viettronics Tân Bình',
      exchange: 'HOSE',
      shortName: 'Viettronics Tân Bình',
      companyNameEn: 'Viettronics Tan Binh Joint Stock Company'
    },
    {
      code: 'SGD',
      companyName: 'Công ty Cổ phần Sách Giáo dục tại thành phố Hồ Chí Minh',
      exchange: 'HNX',
      shortName: 'Sách Giáo dục HCM',
      companyNameEn: 'Educational Book Joint Stock Company in Ho Chi Minh City'
    },
    {
      code: 'S12',
      companyName: 'Công ty Cổ phần Sông Đà 12 ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 12',
      companyNameEn: 'Song Da 12 Joint Stock Company'
    },
    {
      code: 'HLA',
      companyName: 'Công ty Cổ phần Hữu Liên Á Châu',
      exchange: 'UPCOM',
      shortName: 'Hữu Liên Á Châu',
      companyNameEn: 'Huu Lien Asia Corporation'
    },
    {
      code: 'DNS',
      companyName: 'Công ty Cổ phần Thép Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'Thép Đà Nẵng',
      companyNameEn: 'Da Nang Steel Joint Stock Company'
    },
    {
      code: 'HDM',
      companyName: 'Công ty Cổ phần Dệt - May Huế ',
      exchange: 'UPCOM',
      shortName: 'Dệt - May Huế',
      companyNameEn: 'Hue Textile Garment Joint Stock Company'
    },
    {
      code: 'BVN',
      companyName: 'Công ty Cổ phần Bông Việt Nam ',
      exchange: 'UPCOM',
      shortName: 'CTCP Bông Việt Nam',
      companyNameEn: 'VietNam Cotton Joint Stock Company'
    },
    {
      code: 'HTM',
      companyName: 'Tổng Công ty Thương Mại Hà Nội - Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'Thương mại Hà Nội',
      companyNameEn: 'HaNoi Trade Corporation'
    },
    {
      code: 'VNL',
      companyName: 'Công ty Cổ phần LOGISTICS VINALINK ',
      exchange: 'HOSE',
      shortName: 'LOGISTICS VINALINK',
      companyNameEn: 'Vinalink International Freight Forwarders'
    },
    {
      code: 'GTA',
      companyName: 'Công ty Cổ phần chế biến gỗ Thuận An',
      exchange: 'HOSE',
      shortName: 'Gỗ Thuận An',
      companyNameEn: 'Thuan An Wood Processing Joint Stock Company'
    },
    {
      code: 'VHF',
      companyName: 'Công ty Cổ phần Xây dựng và chế biến lương thực Vĩnh Hà',
      exchange: 'UPCOM',
      shortName: 'L.thực Vĩnh Hà',
      companyNameEn: 'Vinh Ha Food Processing And Construction Joint Stock Company'
    },
    {
      code: 'PVT',
      companyName: 'Tổng Công ty Cổ phần Vận tải dầu khí',
      exchange: 'HOSE',
      shortName: 'TCT V.tải dầu khí',
      companyNameEn: 'Petrovietnam Transportation Corporation'
    },
    {
      code: 'BTP',
      companyName: 'Công ty Cổ phần Nhiệt điện Bà Rịa',
      exchange: 'HOSE',
      shortName: 'Nh.điện Bà Rịa',
      companyNameEn: 'Ba Ria Thermal Power Joint Stock Company'
    },
    {
      code: 'NOS',
      companyName: 'Công ty cổ phần Vận tải biển và Thương mại Phương Đông',
      exchange: 'UPCOM',
      shortName: 'V.tải biển P.Đông',
      companyNameEn: 'Oriental Shipping and Trading Joint Stock Company'
    },
    {
      code: 'PVG',
      companyName: 'CÔNG TY CỔ PHẦN KINH DOANH LPG VIỆT NAM',
      exchange: 'HNX',
      shortName: 'Kinh doanh LPG',
      companyNameEn: 'PETRO VIETNAM LPG JOINT STOCK COMPANY'
    },
    {
      code: 'TL4',
      companyName: 'Tổng Công ty Xây dựng Thủy lợi 4 ',
      exchange: 'UPCOM',
      shortName: 'TCT XD Thủy lợi 4',
      companyNameEn: 'Hydraulics Construction Corporation No.4 - Joint Stock Company'
    },
    {
      code: 'MAS',
      companyName: 'Công ty Cổ phần Dịch vụ hàng không sân bay Đà Nẵng ',
      exchange: 'HNX',
      shortName: 'DV sân bay Đà Nẵng',
      companyNameEn: 'Danang Airport Services Joint Stock Company'
    },
    {
      code: 'SDU',
      companyName: 'Công ty Cổ phần Đầu tư xây dựng và Phát triển đô thị Sông Đà',
      exchange: 'HNX',
      shortName: 'Đô thị Sông Đà',
      companyNameEn: 'Song Da Urban Investment Construction And Development Joint Stock Company'
    },
    {
      code: 'AGR',
      companyName: 'Công ty Cổ phần Chứng khoán Agribank',
      exchange: 'HOSE',
      shortName: 'Chứng khoán Agribank',
      companyNameEn: 'AGRIBANK SECURITIES CORPORATION'
    },
    {
      code: 'PGS',
      companyName: 'Công ty cổ phần kinh doanh khí miền nam',
      exchange: 'HNX',
      shortName: 'Kinh doanh khí Miền Nam',
      companyNameEn: 'Southern gas trading joint stock company'
    },
    {
      code: 'DNT',
      companyName: 'Công ty Cổ phần Du lịch Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'Du lịch Đồng Nai',
      companyNameEn: 'Dong Nai Tourist Joint Stock Company'
    },
    {
      code: 'DDM',
      companyName: 'Công ty Cổ phần Hàng hải Đông Đô ',
      exchange: 'UPCOM',
      shortName: 'Hàng hải Đông Đô',
      companyNameEn: 'Dong Do Marine Joint Stock Company'
    },
    {
      code: 'DND',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Vật liệu Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'V.liệu Đồng Nai',
      companyNameEn: 'Dong Nai Material  Investment Joint - Stock Company'
    },
    {
      code: 'RCL',
      companyName: 'Công ty Cổ phần Địa ốc Chợ Lớn',
      exchange: 'HNX',
      shortName: 'Địa ốc Chợ Lớn',
      companyNameEn: 'ChoLon Real Estate Joint Stock Company'
    },
    {
      code: 'PHR',
      companyName: 'Công ty Cổ phần Cao su Phước Hòa ',
      exchange: 'HOSE',
      shortName: 'Cao su Phước Hòa',
      companyNameEn: 'Phuoc Hoa Rubber Joint Stock Company'
    },
    {
      code: 'RIC',
      companyName: 'Công ty Cổ phần Quốc tế Hoàng Gia',
      exchange: 'HOSE',
      shortName: 'Quốc tế Hoàng Gia',
      companyNameEn: 'Royal International Corporation'
    },
    {
      code: 'ACL',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Thủy sản Cửu Long An Giang',
      exchange: 'HOSE',
      shortName: 'XNK Thủy sản Cửu Long An Giang',
      companyNameEn: 'Cuulong Fish Joint Stock Company'
    },
    {
      code: 'LHC',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng Thủy lợi Lâm Đồng',
      exchange: 'HNX',
      shortName: 'Th.lợi Lâm Đồng',
      companyNameEn: 'Lam Dong Investment Hydraulic Construction Joint Stock Company'
    },
    {
      code: 'VIM',
      companyName: 'Công ty Cổ phần Khoáng sản Viglacera',
      exchange: 'UPCOM',
      shortName: 'K.sản Viglacera',
      companyNameEn: 'Viglacera Mineral Joint Stock Company'
    },
    {
      code: 'IJC',
      companyName: 'Công ty Cổ phần Phát triển Hạ tầng Kỹ thuật',
      exchange: 'HOSE',
      shortName: 'P.triển H.tầng KT',
      companyNameEn: 'Becamex Infrastructure Development Joint Stock Company'
    },
    {
      code: 'DPM',
      companyName: 'Tổng Công ty Cổ phần Phân bón và Hóa chất dầu khí',
      exchange: 'HOSE',
      shortName: 'Đạm Phú Mỹ',
      companyNameEn: 'Petrovietnam Fertilizer and Chemical Corporation'
    },
    {
      code: 'TMP',
      companyName: 'Công ty Cổ phần Thủy điện Thác Mơ',
      exchange: 'HOSE',
      shortName: 'Th.điện Thác Mơ',
      companyNameEn: 'Thac Mo Hydro Power Joint Stock Company'
    },
    {
      code: 'SCJ',
      companyName: 'Công ty Cổ phần Xi măng Sài Sơn',
      exchange: 'UPCOM',
      shortName: 'Xi măng Sài Sơn',
      companyNameEn: 'Sai Son Cement Joint Stock Company'
    },
    {
      code: 'BAX',
      companyName: 'Công ty Cổ phần Thống Nhất',
      exchange: 'HNX',
      shortName: 'CTCP Thống Nhất',
      companyNameEn: 'Thong Nhat Joint Stock Company'
    },
    {
      code: 'ANV',
      companyName: 'Công ty TNHH Amicogen Nam Việt',
      exchange: 'HOSE',
      shortName: 'Amicogen Nam Việt',
      companyNameEn: 'Amicogen Nam Viet Company Limited'
    },
    {
      code: 'HGT',
      companyName: 'CÔNG TY CỔ PHẦN DU LỊCH HƯƠNG GIANG',
      exchange: 'UPCOM',
      shortName: 'Du lịch Hương Giang',
      companyNameEn: 'Huong Giang Tourist Joint Stock Company'
    },
    {
      code: 'BWS',
      companyName: 'Công ty cổ phần Cấp nước Bà Rịa - Vũng Tàu',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Bà Rịa VT',
      companyNameEn: 'Ba Ria-Vung Tau Water Supply Joint Stock Company'
    },
    {
      code: 'NBP',
      companyName: 'Công ty Cổ phần Nhiệt điện Ninh Bình',
      exchange: 'HNX',
      shortName: 'Nh.điện Ninh Bình',
      companyNameEn: 'Ninh Binh Thermal Power Joint Stock Company'
    },
    {
      code: 'TV1',
      companyName: 'Công ty Cổ phần Tư vấn xây dựng điện 1',
      exchange: 'UPCOM',
      shortName: 'Tư vấn XD điện 1',
      companyNameEn: 'Power Engineering Consulting Joint Stock Company 1'
    },
    {
      code: 'BTW',
      companyName: 'Công ty Cổ phần Cấp nước Bến Thành',
      exchange: 'HNX',
      shortName: 'Cấp nước Bến Thành',
      companyNameEn: 'Ben Thanh Water Supply Joint Stock Company'
    },
    {
      code: 'FDG',
      companyName: 'Công ty Cổ phần DOCIMEXCO',
      exchange: 'UPCOM',
      shortName: 'DOCIMEXCO',
      companyNameEn: 'DongThap Trading Corporation'
    },
    {
      code: 'HSA',
      companyName: 'Công ty Cổ phần Hestia',
      exchange: 'UPCOM',
      shortName: 'CTCP Hestia',
      companyNameEn: 'Hestia Joint Stock Company'
    },
    {
      code: 'CTD',
      companyName: 'Công ty Cổ phần Xây dựng Coteccons',
      exchange: 'HOSE',
      shortName: 'Xây dựng Coteccons',
      companyNameEn: 'Coteccons Construction Joint Stock Company'
    },
    {
      code: 'TMW',
      companyName: 'Công ty Cổ phần tổng hợp gỗ Tân Mai',
      exchange: 'UPCOM',
      shortName: 'Gỗ Tân Mai',
      companyNameEn: 'TAN MAI GENERAL WOOD JOINT STOCK COMPANY'
    },
    {
      code: 'X26',
      companyName: 'Công ty cổ phần 26',
      exchange: 'UPCOM',
      shortName: 'Công ty Cổ phần 26',
      companyNameEn: '26 Joint Stock Company'
    },
    {
      code: 'BWA',
      companyName: 'Công ty Cổ phần Cấp thoát nước và Xây dựng Bảo Lộc ',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Bảo Lộc',
      companyNameEn: 'Bao Loc Supply Sewerage and Construction Joint Stock Company'
    },
    {
      code: 'VKD',
      companyName: 'Công ty Cổ phần Nước khoáng Khánh Hòa - FIT Beverage',
      exchange: 'UPCOM',
      shortName: 'Nước khoáng Kh.Hòa',
      companyNameEn: 'Khanh Hoa Mineral Water Joint Stock Company'
    },
    {
      code: 'CNN',
      companyName: 'Công ty cổ phần Tư vấn công nghệ, thiết bị và kiểm định xây dựng - CONINCO',
      exchange: 'UPCOM',
      shortName: 'Tư vấn XD CONINCO',
      companyNameEn: 'Consultant and Inspection Joint stock company of Construction Technology and Equipment - CONINCO'
    },
    {
      code: 'VIC',
      companyName: 'Tập đoàn VINGROUP - CTCP',
      exchange: 'HOSE',
      shortName: 'Tập đoàn VINGROUP',
      companyNameEn: 'VINGROUP Joint Stock Company'
    },
    {
      code: 'DPH',
      companyName: 'Công ty cổ phần Dược phẩm Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm H.Phòng',
      companyNameEn: 'Hai Phong Pharmaceutical Joint Stock Company'
    },
    {
      code: 'SBL',
      companyName: 'Công ty cổ phần Bia Sài Gòn - Bạc Liêu',
      exchange: 'UPCOM',
      shortName: 'Bia SG Bạc Liêu',
      companyNameEn: 'Saigon Baclieu Beer Joint Stock Company'
    },
    {
      code: 'CVT',
      companyName: 'Công ty Cổ phần CMC',
      exchange: 'HOSE',
      shortName: 'CTCP CMC',
      companyNameEn: 'CMC Joint Stock Company'
    },
    {
      code: 'L10',
      companyName: 'Công ty Cổ phần LILAMA 10',
      exchange: 'HOSE',
      shortName: 'CTCP LILAMA 10',
      companyNameEn: 'LILAMA 10 Joint Stock Company'
    },
    {
      code: 'LM3',
      companyName: 'Công ty Cổ phần Lilama 3 ',
      exchange: 'UPCOM',
      shortName: 'CTCP Lilama 3',
      companyNameEn: 'Lilama 3 Joint Stock Company'
    },
    {
      code: 'LO5',
      companyName: 'Công ty Cổ phần Lilama 5 ',
      exchange: 'HNX',
      shortName: 'CTCP Lilama 5',
      companyNameEn: 'Lilama 5 Joint Stock Company'
    },
    {
      code: 'PAI',
      companyName: 'Công ty Cổ phần Công nghệ Thông tin, Viễn thông và Tự động hóa Dầu Khí',
      exchange: 'UPCOM',
      shortName: 'Tự động hóa D.khí',
      companyNameEn: 'Petroleum Information Technology Telecom and Automation Joint Stock Company'
    },
    {
      code: 'CET',
      companyName: 'CÔNG TY CỔ PHẦN HTC HOLDING',
      exchange: 'HNX',
      shortName: 'HTC HOLDING',
      companyNameEn: 'HTC HOLDING JOINT STOCK COMPANY'
    },
    {
      code: 'MRF',
      companyName: 'Công ty cổ phần Merufa',
      exchange: 'UPCOM',
      shortName: 'CTCP Merufa',
      companyNameEn: 'Merufa Joint Stock Company'
    },
    {
      code: 'WCS',
      companyName: 'Công ty Cổ phần Bến xe miền Tây',
      exchange: 'HNX',
      shortName: 'Bến xe miền Tây',
      companyNameEn: 'West Coach Station Joint Stock Company'
    },
    {
      code: 'DBD',
      companyName: 'Công ty Cổ phần Dược - Trang thiết bị Y tế Bình Định (Bidiphar)',
      exchange: 'HOSE',
      shortName: 'Dược Bidiphar',
      companyNameEn: 'BinhDinh Pharmaceutical and Medical Equipment Joint Stock Company (Bidiphar)'
    },
    {
      code: 'HKC',
      companyName: 'Công ty Cổ phần Dệt kim Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Dệt kim Hà Nội',
      companyNameEn: 'Hanoi Knitting Joint Stock Company'
    },
    {
      code: 'FTM',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Đức Quân',
      exchange: 'HOSE',
      shortName: 'ĐTPT Đức Quân',
      companyNameEn: 'Duc Quan Investment and Development Joint Stock Company'
    },
    {
      code: 'FRC',
      companyName: 'Công ty cổ phần Lâm đặc sản Xuất khẩu Quảng Nam',
      exchange: 'UPCOM',
      shortName: 'Lâm đặc sản Q.Nam',
      companyNameEn: 'Forest Products Export Joint – Stock Company Of Quang Nam'
    },
    {
      code: 'GER',
      companyName: 'Công ty Cổ phần Thể Thao Ngôi Sao Geru',
      exchange: 'UPCOM',
      shortName: 'Thể thao Geru',
      companyNameEn: 'Geru Star Sport Joint Stock Company'
    },
    {
      code: 'HCB',
      companyName: 'Công ty cổ phần Dệt may 29/3',
      exchange: 'UPCOM',
      shortName: 'Dệt may 29/3',
      companyNameEn: 'March 29 Textile – Garment Joint Stock Company'
    },
    {
      code: 'CC4',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng số 4',
      exchange: 'UPCOM',
      shortName: 'Xây dựng số 4',
      companyNameEn: 'Investment and Construction Joint Stock Company No.4'
    },
    {
      code: 'LCG',
      companyName: 'Công ty Cổ phần LICOGI 16',
      exchange: 'HOSE',
      shortName: 'CTCP LICOGI 16',
      companyNameEn: 'Licogi 16 Joint Stock Company'
    },
    {
      code: 'QHW',
      companyName: 'Công ty Cổ phần nước khoáng Quảng Ninh',
      exchange: 'UPCOM',
      shortName: 'Nước khoáng Q.Ninh',
      companyNameEn: 'Quang Ninh Mineral Water Corporation'
    },
    {
      code: 'SD2',
      companyName: 'Công ty Cổ phần Sông Đà 2',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 2',
      companyNameEn: 'Song Da 2 Joint Stock Company'
    },
    {
      code: 'GVT',
      companyName: 'Công ty Cổ phần Giấy Việt Trì',
      exchange: 'UPCOM',
      shortName: 'CTCP Giấy Việt Trì',
      companyNameEn: 'VietTri Paper Joint Stock Company'
    },
    {
      code: 'C36',
      companyName: 'Công ty Cổ phần Quản Lý và Xây dựng công trình giao thông 236',
      exchange: 'UPCOM',
      shortName: 'C.trình GT 236',
      companyNameEn: '236 Traffic Project Construction and Management Joint stock company'
    },
    {
      code: 'FHS',
      companyName: 'Công ty cổ phần Phát hành sách thành phố Hồ Chí Minh - FAHASA',
      exchange: 'UPCOM',
      shortName: 'FAHASA',
      companyNameEn: 'Ho Chi Minh City Book Distribution Corporation'
    },
    {
      code: 'HGW',
      companyName: 'Công ty TNHH MTV Thương mại - Dịch vụ - Xây dựng Cửu Long',
      exchange: 'UPCOM',
      shortName: 'TNHH Cửu Long',
      companyNameEn: 'Cuu Long Construction Trading Service Limited Liability Company'
    },
    {
      code: 'VMI',
      companyName: 'Công ty Cổ phần Khoáng sản và Đầu tư VISACO',
      exchange: 'HNX',
      shortName: 'K.sản Đ.tư VISACO',
      companyNameEn: 'VISACO MINERAL AND INVESTMENT JOINT STOCK COMPANY'
    },
    {
      code: 'CHS',
      companyName: 'Công ty Cổ phần Chiếu sáng công cộng Thành phố Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'Chiếu sáng TP.HCM',
      companyNameEn: 'Ho Chi Minh City Public Lighting Joint Stock Company'
    },
    {
      code: 'L61',
      companyName: 'Công ty Cổ phần LILAMA 69-1',
      exchange: 'HNX',
      shortName: 'CTCP LILAMA 69-1',
      companyNameEn: 'Lilama 69-1 Joint Stock Company'
    },
    {
      code: 'SBD',
      companyName: 'Công ty cổ phần Công nghệ Sao Bắc Đẩu',
      exchange: 'UPCOM',
      shortName: 'Công nghệ Sao Bắc Đẩu',
      companyNameEn: 'SaoBacDau Technologies Corporation'
    },
    {
      code: 'TSC',
      companyName: 'Công ty Cổ phần Vật tư kỹ thuật nông nghiệp Cần Thơ',
      exchange: 'HOSE',
      shortName: 'N.nghiệp Cần Thơ',
      companyNameEn: 'Techno – Agricultural Supplying Joint Stock Company'
    },
    {
      code: 'HDC',
      companyName: 'Công ty Cổ phần Phát triển nhà Bà Rịa-Vũng Tàu',
      exchange: 'HOSE',
      shortName: 'Nhà Bà Rịa VT',
      companyNameEn: 'Ba Ria – Vung Tau House Development Joint Stock Company'
    },
    {
      code: 'VST',
      companyName: 'Công ty Cổ phần Vận tải và Thuê tàu biển Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Thuê tàu biển VN',
      companyNameEn: 'Viet Nam Sea Transport and Chartering Joint Stock Company'
    },
    {
      code: 'VNP',
      companyName: 'Công ty Cổ phần nhựa Việt Nam ',
      exchange: 'UPCOM',
      shortName: 'Nhựa Việt Nam',
      companyNameEn: 'Vietnam plastic joint stock corporation'
    },
    {
      code: 'AGM',
      companyName: 'Công ty Cổ phần xuất nhập khẩu An Giang',
      exchange: 'HOSE',
      shortName: 'CTCP XNK An Giang',
      companyNameEn: 'An Giang import export joint stock company'
    },
    {
      code: 'TTF',
      companyName: 'Công ty Cổ phần Tập đoàn Kỹ nghệ gỗ Trường Thành ',
      exchange: 'HOSE',
      shortName: 'Gỗ Trường Thành',
      companyNameEn: 'Truong Thanh Furniture Corporation'
    },
    {
      code: 'VGG',
      companyName: 'Tổng Công ty Cổ phần may Việt Tiến ',
      exchange: 'UPCOM',
      shortName: 'May Việt Tiến',
      companyNameEn: 'Viet Tien garment joint stock corporation'
    },
    {
      code: 'DST',
      companyName: 'Công ty Cổ phần Đầu tư Sao Thăng Long',
      exchange: 'HNX',
      shortName: 'ĐT Sao Thăng Long',
      companyNameEn: 'Sao Thang Long Investment Joint Stock Company'
    },
    {
      code: 'SC5',
      companyName: 'Công ty Cổ phần Xây dựng số 5 ',
      exchange: 'HOSE',
      shortName: 'CTCP Xây dựng số 5',
      companyNameEn: 'Construction Joint Stock Company No 5'
    },
    {
      code: 'VGT',
      companyName: 'Tập đoàn Dệt May Việt Nam',
      exchange: 'UPCOM',
      shortName: 'T.đoàn Dệt May VN',
      companyNameEn: 'Vietnam National Textile And Garment Group'
    },
    {
      code: 'CDC',
      companyName: 'Công ty Cổ phần Chương Dương',
      exchange: 'HOSE',
      shortName: 'CTCP Chương Dương',
      companyNameEn: 'Chuong Duong  Joint Stock Company'
    },
    {
      code: 'PSI',
      companyName: 'Công ty Cổ phần Chứng khoán Dầu khí',
      exchange: 'HNX',
      shortName: 'CK Dầu khí',
      companyNameEn: 'Petrovietnam Securities Incorporated'
    },
    {
      code: 'UIC',
      companyName: 'Công ty Cổ phần Đầu tư phát triển Nhà và Đô thị IDICO ',
      exchange: 'HOSE',
      shortName: 'Nhà & Đ.thị IDICO',
      companyNameEn: 'IDICO Urban and House Development Joint Stock Company'
    },
    {
      code: 'IDC',
      companyName: 'Tổng Công ty IDICO - CTCP',
      exchange: 'HNX',
      shortName: 'TCT IDICO',
      companyNameEn: 'IDICO Corporation - JSC'
    },
    {
      code: 'C92',
      companyName: 'Công ty Cổ phần Xây dựng và Đầu tư 492',
      exchange: 'HNX',
      shortName: 'Xây dựng 492',
      companyNameEn: 'Construction and Investment Joint Stock Company No 492'
    },
    {
      code: 'VND',
      companyName: 'Công ty Cổ phần Chứng khoán VNDIRECT',
      exchange: 'HNX',
      shortName: 'VNDIRECT',
      companyNameEn: 'VNDIRECT Securities Corporation'
    },
    {
      code: 'PGD',
      companyName: 'Công ty Cổ phần Phân phối khí Thấp áp Dầu khí Việt Nam',
      exchange: 'HOSE',
      shortName: 'P.phối khí thấp áp',
      companyNameEn: 'Petro Vietnam Low Pressure Gas Distribution Joint Stock Company'
    },
    {
      code: 'TNG',
      companyName: 'Công ty Cổ phần Đầu tư và Thương mại TNG ',
      exchange: 'HNX',
      shortName: 'Đ.tư T.mại TNG',
      companyNameEn: 'TNG Investment And Trading Joint Stock Company'
    },
    {
      code: 'HCT',
      companyName: 'Công ty Cổ phần thương mại dịch vụ vận tải xi măng Hải Phòng',
      exchange: 'HNX',
      shortName: 'V.tải xi măng H.Phòng',
      companyNameEn: 'VICEM Hai Phong Transport Joint Stock Company'
    },
    {
      code: 'SJC',
      companyName: 'Công ty Cổ phần Sông Đà 1.01',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 1.01',
      companyNameEn: 'Song Da 1.01 Joint Stock Company'
    },
    {
      code: 'SD1',
      companyName: 'Công ty Cổ phần Sông Đà 1',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 1',
      companyNameEn: 'Song Da 1 Joint Stock Company'
    },
    {
      code: 'TPC',
      companyName: 'Công ty Cổ phần Nhựa Tân Đại Hưng',
      exchange: 'HOSE',
      shortName: 'Nhựa Tân Đại Hưng',
      companyNameEn: 'Tan Dai Hung Plastic Joint Stock Company'
    },
    {
      code: 'DBT',
      companyName: 'Công ty Cổ phần Dược phẩm Bến Tre',
      exchange: 'HOSE',
      shortName: 'Dược phẩm Bến Tre',
      companyNameEn: 'Ben Tre Pharmaceutical Joint Stock Company'
    },
    {
      code: 'HSM',
      companyName: 'Tổng Công ty Cổ phần Dệt May Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Dệt may Hà Nội',
      companyNameEn: 'HaNoi Textile And Garment Joint Stock Corporation'
    },
    {
      code: 'CMV',
      companyName: 'Công ty Cổ phần Thương Nghiệp Cà Mau',
      exchange: 'HOSE',
      shortName: 'Th.Nghiệp Cà Mau',
      companyNameEn: 'Ca Mau Trading Joint Stock Company'
    },
    {
      code: 'NBB',
      companyName: 'Công ty Cổ phần đầu tư Năm Bảy Bảy ',
      exchange: 'HOSE',
      shortName: 'Đầu tư Năm Bảy Bảy',
      companyNameEn: '577 Investment Corporation'
    },
    {
      code: 'PDC',
      companyName: 'Công ty Cổ phần Du lịch Dầu khí Phương Đông',
      exchange: 'HNX',
      shortName: 'D.lịch DK Ph.Đông',
      companyNameEn: 'Phuong Dong Petroleum Tourism Joint Stock Company'
    },
    {
      code: 'NDT',
      companyName: 'Tổng Công ty cổ phần Dệt May Nam Định',
      exchange: 'UPCOM',
      shortName: 'Dệt may Nam Định',
      companyNameEn: 'Nam Dinh Textile Garment Joint Stock Corporation'
    },
    {
      code: 'TNB',
      companyName: 'Công ty Cổ phần Thép Nhà Bè - VNSTEEL',
      exchange: 'UPCOM',
      shortName: 'Thép Nhà Bè',
      companyNameEn: 'VNSTEEL - Nha Be Steel Joint Stock Company'
    },
    {
      code: 'MDC',
      companyName: 'Công ty Cổ phần Than Mông Dương - Vinacomin',
      exchange: 'HNX',
      shortName: 'Than Mông Dương',
      companyNameEn: 'Vinacomin – Mong Duong Coal Joint Stock Company'
    },
    {
      code: 'HLC',
      companyName: 'Công ty Cổ phần Than Hà Lầm - Vinacomin',
      exchange: 'HNX',
      shortName: 'Than Hà Lầm',
      companyNameEn: 'Vinacomin - Ha Lam coal Joint stock company'
    },
    {
      code: 'ASM',
      companyName: 'Công ty Cổ phần Tập đoàn Sao Mai ',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Sao Mai',
      companyNameEn: 'SAO MAI GROUP CORPORATION'
    },
    {
      code: 'CLH',
      companyName: 'Công ty Cổ phần xi măng La Hiên - VVMI',
      exchange: 'HNX',
      shortName: 'Xi măng La Hiên',
      companyNameEn: 'La Hien Cement Joint Stock Company'
    },
    {
      code: 'TDS',
      companyName: 'Công ty Cổ phần thép Thủ Đức',
      exchange: 'UPCOM',
      shortName: 'Thép Thủ Đức',
      companyNameEn: 'Thu Duc steel joint stock company'
    },
    {
      code: 'SRF',
      companyName: 'Công ty Cổ phần Kỹ Nghệ Lạnh',
      exchange: 'HOSE',
      shortName: 'CTCP Kỹ Nghệ Lạnh',
      companyNameEn: 'Seaprodex Refrigeration Industry Corporation'
    },
    {
      code: 'HEV',
      companyName: 'Công ty Cổ phần Sách Đại học - Dạy nghề',
      exchange: 'HNX',
      shortName: 'Sách ĐH - Dạy nghề',
      companyNameEn: 'Higher Educational And Vocational Book Joint Stock Company'
    },
    {
      code: 'GVR',
      companyName: 'Tập đoàn Công nghiệp Cao su Việt Nam - Công ty cổ phần',
      exchange: 'HOSE',
      shortName: 'Cao su Việt Nam',
      companyNameEn: 'Viet Nam Rubber Group - Joint Stock Company'
    },
    {
      code: 'TST',
      companyName: 'Công ty Cổ phần Dịch vụ Kỹ thuật Viễn thông',
      exchange: 'HNX',
      shortName: 'DV KT Viễn thông',
      companyNameEn: 'Telecommunication Technical Service Joint Stock Company'
    },
    {
      code: 'HCC',
      companyName: 'Công ty Cổ phần Bê tông Hòa Cẩm - Intimex',
      exchange: 'HNX',
      shortName: 'Bê tông Hòa Cẩm',
      companyNameEn: 'Hoa Cam Concrete Joint Stock Company'
    },
    {
      code: 'TJC',
      companyName: 'Công ty Cổ phần Dịch vụ Vận tải và Thương mại ',
      exchange: 'HNX',
      shortName: 'DV V.tải & T.mại',
      companyNameEn: 'Transporation And Trading Services Joint Stock Company'
    },
    {
      code: 'VCS',
      companyName: 'Công ty Cổ phần VICOSTONE',
      exchange: 'HNX',
      shortName: 'CTCP VICOSTONE',
      companyNameEn: 'VICOSTONE Joint Stock Company'
    },
    {
      code: 'SDJ',
      companyName: 'Công ty Cổ phần Sông Đà 25 ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 25',
      companyNameEn: 'Song Da 25 Joint Stock Company'
    },
    {
      code: 'VC3',
      companyName: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN NAM MÊ KÔNG',
      exchange: 'HNX',
      shortName: 'TẬP ĐOÀN NAM MÊ KÔNG',
      companyNameEn: 'NAM MEKONG GROUP JOINT STOCK COMPANY'
    },
    {
      code: 'NDF',
      companyName: 'Công ty Cổ phần Chế biến Thực phẩm Nông sản Xuất khẩu Nam Định',
      exchange: 'UPCOM',
      shortName: 'Nông sản Nam Định',
      companyNameEn: 'Nam Dinh Export Foodstuff and Agricultural Products Processing Jont Stock Company'
    },
    {
      code: 'NTL',
      companyName: 'Công ty Cổ phần Phát triển đô thị Từ Liêm',
      exchange: 'HOSE',
      shortName: 'PT đô thị Từ Liêm',
      companyNameEn: 'Tu Liem Urban Development Joint Stock Company'
    },
    {
      code: 'ST8',
      companyName: 'Công ty Cổ phần Siêu Thanh ',
      exchange: 'HOSE',
      shortName: 'CTCP Siêu Thanh',
      companyNameEn: 'Sieu Thanh Joint Stock Company'
    },
    {
      code: 'DCS',
      companyName: 'Công ty Cổ phần Tập đoàn Đại Châu',
      exchange: 'UPCOM',
      shortName: 'Tập đoàn Đại Châu',
      companyNameEn: 'Dai Chau Group Joint Stock Company'
    },
    {
      code: 'KBC',
      companyName: 'Tổng Công ty Phát triển Đô thị Kinh Bắc - CTCP',
      exchange: 'HOSE',
      shortName: 'Đô thị Kinh Bắc',
      companyNameEn: 'KinhBac City Developement Holding Corporation'
    },
    {
      code: 'XMC',
      companyName: 'Công ty cổ phần Đầu tư và Xây dựng Xuân Mai',
      exchange: 'UPCOM',
      shortName: 'Đ.tư và XD Xuân Mai',
      companyNameEn: 'Xuan Mai Investment And Construction Corporation'
    },
    {
      code: 'VSC',
      companyName: 'Công ty Cổ phần Container Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Container Việt Nam',
      companyNameEn: 'Viet Nam Container Shipping Joint Stock Company'
    },
    {
      code: 'BTH',
      companyName: 'Công ty Cổ phần Chế tạo Biến thế và Vật liệu điện Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Biến thế Hà Nội',
      companyNameEn: 'Ha Noi Transformer Manufacturing and Electric Material Joint Stock Company'
    },
    {
      code: 'MIC',
      companyName: 'Công ty Cổ phần Kỹ nghệ khoáng sản Quảng Nam',
      exchange: 'UPCOM',
      shortName: 'Kỹ nghệ Quảng Nam',
      companyNameEn: 'Quang Nam Mineral Industry Corporation'
    },
    {
      code: 'PVE',
      companyName: 'Tổng Công ty tư vấn thiết kế dầu khí - CTCP',
      exchange: 'UPCOM',
      shortName: 'Tư vấn T.kế D.khí',
      companyNameEn: 'PetroVietnam Engineering Consultancy Joint Stock Company'
    },
    {
      code: 'KMR',
      companyName: 'Công ty Cổ phần Mirae ',
      exchange: 'HOSE',
      shortName: 'CTCP Mirae',
      companyNameEn: 'Mirae Joint Stock Company'
    },
    {
      code: 'HSI',
      companyName: 'Công ty Cổ phần Vật tư Tổng hợp và Phân bón Hóa sinh',
      exchange: 'UPCOM',
      shortName: 'Phân bón Hóa sinh',
      companyNameEn: 'General Materials Biochemistry Fertilizer Joint Stock Company'
    },
    {
      code: 'VHC',
      companyName: 'Công ty Cổ phần Vĩnh Hoàn',
      exchange: 'HOSE',
      shortName: 'CTCP Vĩnh Hoàn',
      companyNameEn: 'Vinh Hoan Corporation'
    },
    {
      code: 'DAP',
      companyName: 'Công ty Cổ phần Đông Á',
      exchange: 'UPCOM',
      shortName: 'CTCP Đông Á',
      companyNameEn: 'DoPack Joint Stock Company'
    },
    {
      code: 'ISH',
      companyName: 'Công ty Cổ phần thủy điện SROK Phu Miêng IDICO',
      exchange: 'UPCOM',
      shortName: 'Th.điện Srok PM',
      companyNameEn: 'IDICO SROK Phu Mieng hydropower joint stock company'
    },
    {
      code: 'NNT',
      companyName: 'Công ty Cổ phần Cấp nước Ninh Thuận',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Ninh Thuận',
      companyNameEn: 'Ninh Thuan Water Supply Joint Stock Company'
    },
    {
      code: 'NTW',
      companyName: 'Công ty Cổ phần Cấp nước Nhơn Trạch',
      exchange: 'UPCOM',
      shortName: 'Cấp nước Nhơn Trạch',
      companyNameEn: 'Nhon Trach Water Supply Joint Stock Company'
    },
    {
      code: 'VC7',
      companyName: 'Công ty Cổ phần Xây dựng số 7 ',
      exchange: 'HNX',
      shortName: 'Xây dựng số 7',
      companyNameEn: 'No7 Vietnam Construction Joint Stock Company'
    },
    {
      code: 'SDD',
      companyName: 'Công ty Cổ phần Đầu tư và Xây lắp Sông Đà',
      exchange: 'UPCOM',
      shortName: 'X.lắp Sông Đà',
      companyNameEn: 'Song Da Investment and Construction Joint Stock Company'
    },
    {
      code: 'S96',
      companyName: 'Công ty Cổ phần Sông Đà 9.06',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 9.06',
      companyNameEn: 'Song Da No 9.06 Joint Stock Company'
    },
    {
      code: 'CAP',
      companyName: 'Công ty Cổ phần Lâm nông sản thực phẩm Yên Bái',
      exchange: 'HNX',
      shortName: 'Lâm Nông Sản Y.Bái',
      companyNameEn: 'YenBai Joint Stock Forest Agricultural Products And Foodstuff Company'
    },
    {
      code: 'NGC',
      companyName: 'Công ty Cổ phần Chế biến thủy sản Xuất khẩu Ngô Quyền ',
      exchange: 'HNX',
      shortName: 'Th.sản Ngô Quyền',
      companyNameEn: 'Ngo Quyen Processing Export Joint Stock Company'
    },
    {
      code: 'LUT',
      companyName: 'Công ty Cổ phần Đầu tư xây dựng Lương Tài',
      exchange: 'HNX',
      shortName: 'ĐT XD Lương Tài',
      companyNameEn: 'Luong Tai Investment Construction Joint Stock Company'
    },
    {
      code: 'NHH',
      companyName: 'Công ty Cổ phần Nhựa Hà Nội',
      exchange: 'HOSE',
      shortName: 'Nhựa Hà Nội',
      companyNameEn: 'Hanoi Plastics Joint Stock Company'
    },
    {
      code: 'HEC',
      companyName: 'Công ty cổ phần Tư vấn Xây dựng Thủy Lợi II',
      exchange: 'UPCOM',
      shortName: 'XD Thủy Lợi II',
      companyNameEn: 'Hydraulic Engineering Consultant Corporation II'
    },
    {
      code: 'CHC',
      companyName: 'Công ty cổ phần Cẩm Hà',
      exchange: 'UPCOM',
      shortName: 'CTCP Cẩm Hà',
      companyNameEn: 'Cam Ha Joint Stock Company'
    },
    {
      code: 'DSC',
      companyName: 'Công ty Cổ phần Chứng khoán Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'CK Đà Nẵng',
      companyNameEn: 'Da Nang Securities Company'
    },
    {
      code: 'ORS',
      companyName: 'Công ty Cổ phần Chứng khoán Tiên Phong',
      exchange: 'UPCOM',
      shortName: 'CK Tiên Phong',
      companyNameEn: 'Tien Phong Securites Corporation'
    },
    {
      code: 'GEX',
      companyName: 'Tổng Công ty Cổ phần Thiết bị điện Việt Nam',
      exchange: 'HOSE',
      shortName: 'Thiết bị điện VN',
      companyNameEn: 'Vietnam Electrical Equipment Joint Stock Corporation'
    },
    {
      code: 'SBS',
      companyName: 'Công ty Cổ phần Chứng khoán Ngân hàng Sài Gòn Thương tín ',
      exchange: 'UPCOM',
      shortName: 'CK Sacombank',
      companyNameEn: 'Sacombank Securities Joint Stock Company'
    },
    {
      code: 'SJM',
      companyName: 'Công ty Cổ phần Sông Đà 19 ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 19',
      companyNameEn: 'Song Da 19 Joint Stock Company'
    },
    {
      code: 'QNC',
      companyName: 'Công ty Cổ phần Xi măng và Xây dựng Quảng Ninh',
      exchange: 'UPCOM',
      shortName: 'Xi măng Quảng Ninh',
      companyNameEn: 'Quang Ninh Construction and Cement Joint Stock Company'
    },
    {
      code: 'VC5',
      companyName: 'Công ty Cổ phần Xây dựng số 5_Vinaconex',
      exchange: 'UPCOM',
      shortName: 'XD 5 - Vinaconex',
      companyNameEn: 'Construction Joint Stock Company - Number 5'
    },
    {
      code: 'SRA',
      companyName: 'Công ty Cổ phần Sara Việt Nam ',
      exchange: 'HNX',
      shortName: 'Sara Việt Nam',
      companyNameEn: 'SARA Viet Nam Joint Stock Company'
    },
    {
      code: 'NAB',
      companyName: 'Ngân hàng Thương mại Cổ phần Nam Á',
      exchange: 'UPCOM',
      shortName: 'NH Nam Á',
      companyNameEn: 'Nam A Commercial Joint Stock Bank'
    },
    {
      code: 'FTS',
      companyName: 'Công ty Cổ phần Chứng khoán FPT',
      exchange: 'HOSE',
      shortName: 'Chứng khoán FPT',
      companyNameEn: 'FPT Securities Joint Stock Company'
    },
    {
      code: 'SGT',
      companyName: 'Công ty Cổ phần Công nghệ Viễn thông Sài Gòn',
      exchange: 'HOSE',
      shortName: 'Viễn thông SG',
      companyNameEn: 'Sai Gon Telecommunication And Technologies Corporation'
    },
    {
      code: 'VC6',
      companyName: 'Công ty cổ phần Xây dựng và Đầu tư Visicons',
      exchange: 'HNX',
      shortName: 'Xây dựng Visicons',
      companyNameEn: 'Visicons Construction and Investment Joint Stock Company'
    },
    {
      code: 'VHG',
      companyName: 'Công ty Cổ phần Đầu tư Cao su Quảng Nam',
      exchange: 'UPCOM',
      shortName: 'Cao su Quảng Nam',
      companyNameEn: 'Quang Nam Rubber Investment Joint Stock Company'
    },
    {
      code: 'VE9',
      companyName: 'Công ty Cổ phần Đầu tư và xây dựng VNECO 9 ',
      exchange: 'UPCOM',
      shortName: 'Xây dựng VNECO 9',
      companyNameEn: 'VNECO 9 Investment & Construction Joint Stock Company'
    },
    {
      code: 'VSI',
      companyName: 'Công ty Cổ phần đầu tư và xây dựng cấp thoát nước',
      exchange: 'HOSE',
      shortName: 'Đ.tư XD C.thoát nc',
      companyNameEn: 'Water Supply Sewerage Construction And Investment Joint Stock Company'
    },
    {
      code: 'PDN',
      companyName: 'Công ty Cổ phần Cảng Đồng Nai ',
      exchange: 'HOSE',
      shortName: 'Cảng Đồng Nai',
      companyNameEn: 'Dong Nai Port Joint Stock Company'
    },
    {
      code: 'SPC',
      companyName: 'Công ty Cổ phần Bảo vệ thực vật Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Bảo vệ thực vật SG',
      companyNameEn: 'Saigon plant Prôtectin Joint Stock Company'
    },
    {
      code: 'SCR',
      companyName: 'Công ty Cổ phần Địa ốc Sài Gòn Thương Tín',
      exchange: 'HOSE',
      shortName: 'Địa ốc Sacomreal',
      companyNameEn: 'Sai Gon Thuong Tin Real Estate Joint Stock Company'
    },
    {
      code: 'ASP',
      companyName: 'Công ty Cổ phần Tập đoàn Dầu khí An Pha',
      exchange: 'HOSE',
      shortName: 'Dầu khí An Pha',
      companyNameEn: 'An Pha Petroleum Group Joint Stock Company'
    },
    {
      code: 'DQC',
      companyName: 'Công ty Cổ phần Bóng đèn Điện Quang',
      exchange: 'HOSE',
      shortName: 'Đèn Điện Quang',
      companyNameEn: 'Dien Quang Joint Stock Company'
    },
    {
      code: 'DXV',
      companyName: 'Công ty Cổ phần ViCem Vật liệu xây dựng Đà Nẵng',
      exchange: 'HOSE',
      shortName: 'VLXD Đà Nẵng',
      companyNameEn: 'Da Nang Construction Building Materials And Cement Joint Stock Company'
    },
    {
      code: 'SBT',
      companyName: 'Công ty Cổ phần Thành Thành Công - Biên Hòa',
      exchange: 'HOSE',
      shortName: 'Thành Thành Công - Biên Hòa',
      companyNameEn: 'Thanh Thanh Cong - Bien Hoa Joint Stock Company'
    },
    {
      code: 'HBE',
      companyName: 'Công ty Cổ phần Sách-Thiết bị trường học Hà Tĩnh ',
      exchange: 'HNX',
      shortName: 'T.bị trg học H.Tĩnh',
      companyNameEn: 'Ha Tinh Book And Equiptment Education Joint Stock COmpany'
    },
    {
      code: 'PTV',
      companyName: 'Công ty cổ phần Thương mại Dầu khí',
      exchange: 'UPCOM',
      shortName: 'Thương mại Dầu khí',
      companyNameEn: 'Petroleum Trading Joint Stock Company'
    },
    {
      code: 'KTC',
      companyName: 'Công ty Cổ phần Thương mại Kiên Giang',
      exchange: 'UPCOM',
      shortName: 'T.mại Kiên Giang',
      companyNameEn: 'Kien Giang Trading Joint Stock Company'
    },
    {
      code: 'DBC',
      companyName: 'Công ty Cổ phần Tập đoàn Dabaco Việt Nam',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Dabaco VN',
      companyNameEn: 'Dabaco Group'
    },
    {
      code: 'SRB',
      companyName: 'Công ty Cổ phần Tập đoàn SARA ',
      exchange: 'UPCOM',
      shortName: 'CTCP Tập đoàn SARA',
      companyNameEn: 'SARA Group Joint Stock Company'
    },
    {
      code: 'B82',
      companyName: 'Công ty Cổ phần 482',
      exchange: 'UPCOM',
      shortName: 'CTCP 482',
      companyNameEn: 'Joint - Stock Company No 482'
    },
    {
      code: 'S4A',
      companyName: 'Công ty Cổ phần Thủy điện Sê San 4A',
      exchange: 'HOSE',
      shortName: 'Th.điện Sê San 4A',
      companyNameEn: 'SeSan 4A HydroElectric Joint Stock Compnay'
    },
    {
      code: 'ACS',
      companyName: 'Công ty Cổ phần Xây lắp Thương mại 2',
      exchange: 'UPCOM',
      shortName: 'X.lắp T.mại 2',
      companyNameEn: 'Architects & Construction Service Corporation'
    },
    {
      code: 'TVD',
      companyName: 'Công ty Cổ phần than Vàng Danh - Vinacomin ',
      exchange: 'HNX',
      shortName: 'Than Vàng Danh',
      companyNameEn: 'Vinacomin - Vang Danh Coal Joint Stock Company'
    },
    {
      code: 'BAB',
      companyName: 'Ngân hàng Thương mại cổ phần Bắc Á',
      exchange: 'HNX',
      shortName: 'Ngân hàng Bắc Á',
      companyNameEn: 'Bac A Commercial Joint Stock Bank'
    },
    {
      code: 'KLB',
      companyName: 'Ngân hàng Thương mại Cổ phần Kiên Long',
      exchange: 'UPCOM',
      shortName: 'KienLong Bank',
      companyNameEn: 'Kien Long Commercial Joint Stock Bank'
    },
    {
      code: 'NVB',
      companyName: 'Ngân hàng Thương mại Cổ phần Quốc Dân ',
      exchange: 'HNX',
      shortName: 'Ngân hàng Quốc Dân',
      companyNameEn: 'National Citizen Commercial Joint Stock Bank'
    },
    {
      code: 'VBB',
      companyName: 'Ngân hàng Thương mại Cổ phần Việt Nam Thương Tín',
      exchange: 'UPCOM',
      shortName: 'Vietbank',
      companyNameEn: 'Vietnam Thuong Tin Commercial Joint Stock Bank'
    },
    {
      code: 'PGB',
      companyName: 'NGÂN HÀNG TMCP XĂNG DẦU PETROLIMEX',
      exchange: 'UPCOM',
      shortName: 'NHTMCP XĂNG DẦU PETROLIMEX',
      companyNameEn: 'PETROLIMEX GROUP COMMERICAL JOINT STOCK COMPANY'
    },
    {
      code: 'BHN',
      companyName: 'Tổng Công ty Cổ phần Bia - Rượu - Nước giải khát Hà Nội',
      exchange: 'HOSE',
      shortName: 'TCT Bia Hà Nội',
      companyNameEn: 'Hanoi Beer Alcohol And Beverage Joint Stock Corporation'
    },
    {
      code: 'X20',
      companyName: 'Công ty cổ phần X20',
      exchange: 'HNX',
      shortName: 'CTCP X20',
      companyNameEn: 'X20 Joint Stock Company'
    },
    {
      code: 'HUT',
      companyName: 'Công ty Cổ phần TASCO ',
      exchange: 'HNX',
      shortName: 'CTCP TASCO',
      companyNameEn: 'Tasco Joint Stock Company'
    },
    {
      code: 'L62',
      companyName: 'Công ty Cổ phần Lilama 69-2',
      exchange: 'HNX',
      shortName: 'CTCP Lilama 69-2',
      companyNameEn: 'LILAMA 69 - 2 Joint Stock company'
    },
    {
      code: 'L18',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng số 18',
      exchange: 'HNX',
      shortName: 'Xây dựng số 18',
      companyNameEn: 'Construction and Investment JSC No18'
    },
    {
      code: 'APS',
      companyName: 'Công ty Cổ phần Chứng khoán Châu Á - Thái Bình Dương',
      exchange: 'HNX',
      shortName: 'Chứng khoán APEC',
      companyNameEn: 'Asia - Pacific Securities Joint Stock Company'
    },
    {
      code: 'YBC',
      companyName: 'Công ty Cổ phần Xi măng và Khoáng sản Yên Bái ',
      exchange: 'UPCOM',
      shortName: 'X.măng K.sản Y.Bái',
      companyNameEn: 'YenBai Cement and Minerals Joint Stock Company'
    },
    {
      code: 'VKP',
      companyName: 'Công ty Cổ phần Nhựa Tân Hóa',
      exchange: 'UPCOM',
      shortName: 'CTCP Nhựa Tân Hóa',
      companyNameEn: 'VIKY Plastic Joint Stock Company'
    },
    {
      code: 'BLF',
      companyName: 'Công ty Cổ phần Thủy sản Bạc Liêu',
      exchange: 'HNX',
      shortName: 'Thủy sản Bạc Liêu',
      companyNameEn: 'Bac Lieu Fisheries Joint Stock Company'
    },
    {
      code: 'L43',
      companyName: 'Công ty Cổ phần Lilama 45.3',
      exchange: 'HNX',
      shortName: 'CTCP Lilama 45.3',
      companyNameEn: 'Lilama 45.3 Joint Stock Company'
    },
    {
      code: 'VNS',
      companyName: 'Công ty Cổ phần Ánh Dương Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Ánh Dương Việt Nam',
      companyNameEn: 'Vietnam Sun Corporation'
    },
    {
      code: 'APG',
      companyName: 'Công ty Cổ phần Chứng khoán An Phát',
      exchange: 'HOSE',
      shortName: 'CK An Phát',
      companyNameEn: 'An Phat Securities Company'
    },
    {
      code: 'PVX',
      companyName: 'Tổng Công ty Cổ phần Xây lắp Dầu khí Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Xây lắp D.khí VN',
      companyNameEn: 'Petro Vietnam Construction Joint Stock Corporation'
    },
    {
      code: 'SPV',
      companyName: 'Công ty cổ phần Thủy Đặc Sản',
      exchange: 'UPCOM',
      shortName: 'CTCP Thủy Đặc Sản',
      companyNameEn: 'Special Aquatic Products Joint Stock Company'
    },
    {
      code: 'ONE',
      companyName: 'Công ty Cổ phần Truyền thông số 1',
      exchange: 'HNX',
      shortName: 'Truyền thông số 1',
      companyNameEn: 'ONE Corporation'
    },
    {
      code: 'HVG',
      companyName: 'Công ty Cổ phần Hùng Vương ',
      exchange: 'UPCOM',
      shortName: 'CTCP Hùng Vương',
      companyNameEn: 'Hung Vuong Corporation'
    },
    {
      code: 'SZL',
      companyName: 'Công ty Cổ phần Sonadezi Long Thành',
      exchange: 'HOSE',
      shortName: 'Sonadezi Long Thành',
      companyNameEn: 'Sonadezi Long Thanh Joint Stock Company'
    },
    {
      code: 'DC4',
      companyName: 'Công ty cổ phần Xây dựng DIC Holdings',
      exchange: 'HOSE',
      shortName: 'Xây dựng DIC Holdings',
      companyNameEn: 'DIC Holdings Construction JSC'
    },
    {
      code: 'CTC',
      companyName: 'Công ty Cổ phần Gia Lai CTC',
      exchange: 'HNX',
      shortName: 'CTCP Gia Lai CTC',
      companyNameEn: 'CTC Gia Lai Joint Stock Company'
    },
    {
      code: 'TV4',
      companyName: 'Công ty Cổ phần Tư vấn xây dựng điện 4',
      exchange: 'HNX',
      shortName: 'Xây dựng điện 4',
      companyNameEn: 'Power Engineering Consulting Joint Stock Company 4'
    },
    {
      code: 'CNT',
      companyName: 'Công ty Cổ phần Xây dựng và Kinh doanh vật tư ',
      exchange: 'UPCOM',
      shortName: 'XD K.doanh V.tư',
      companyNameEn: 'Construction And Materials Trading Joint Stock Company'
    },
    {
      code: 'MTA',
      companyName: 'Tổng Công ty Khoáng sản và Thương mại Hà Tĩnh - CTCP',
      exchange: 'UPCOM',
      shortName: 'K.sản Hà Tĩnh',
      companyNameEn: 'Ha Tinh Minerals and Trading Joint Stock Corporation'
    },
    {
      code: 'HAG',
      companyName: 'Công ty Cổ phần Hoàng Anh Gia Lai',
      exchange: 'HOSE',
      shortName: 'Hoàng Anh Gia Lai',
      companyNameEn: 'HAGL Joint Stock Company'
    },
    {
      code: 'ITC',
      companyName: 'Công ty Cổ phần Đầu tư - Kinh doanh nhà',
      exchange: 'HOSE',
      shortName: 'Đ.tư K.doanh nhà',
      companyNameEn: 'Investment and Trading Of Real Estate Joint Stock Company'
    },
    {
      code: 'QCG',
      companyName: 'Công ty Cổ phần Quốc Cường Gia Lai ',
      exchange: 'HOSE',
      shortName: 'Quốc Cường Gia Lai',
      companyNameEn: 'Quoc Cuong Gia Lai Joint Stock Company'
    },
    {
      code: 'QTC',
      companyName: 'Công ty Cổ phần Công trình giao thông Vận tải Quảng Nam',
      exchange: 'HNX',
      shortName: 'C.trình GTVT Q.Nam',
      companyNameEn: 'Quang Nam Transportion Construction Joint Stock Company'
    },
    {
      code: 'KKC',
      companyName: 'Công ty Cổ phần Kim khí KKC',
      exchange: 'HNX',
      shortName: 'CTCP Kim khí KKC',
      companyNameEn: 'KKC Metal Joint Stock Comapany'
    },
    {
      code: 'VE1',
      companyName: 'Công ty Cổ phần Xây dựng điện VNECO 1 ',
      exchange: 'HNX',
      shortName: 'XD Điện VNECO 1',
      companyNameEn: 'VNECO1 Electricity Construction Joint Stock Company'
    },
    {
      code: 'TPP',
      companyName: 'Công ty Cổ phần Nhựa Tân Phú',
      exchange: 'HNX',
      shortName: 'CTCP Nhựa Tân Phú',
      companyNameEn: 'TanPhu Plastic Joint Stock Copany'
    },
    {
      code: 'STL',
      companyName: 'Công ty Cổ phần Sông Đà - Thăng Long',
      exchange: 'UPCOM',
      shortName: 'Sông Đà Thăng Long',
      companyNameEn: 'Song Da - Thang Long Join Stock Company'
    },
    {
      code: 'SPP',
      companyName: 'Công ty Cổ phần Bao bì Nhựa Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Bao bì Nhựa SG',
      companyNameEn: 'SaiGon Plastic Packaging Joint Stock Company'
    },
    {
      code: 'THB',
      companyName: 'Công ty Cổ phần Bia Thanh Hóa ',
      exchange: 'HNX',
      shortName: 'Bia Thanh Hóa',
      companyNameEn: 'Thanh Hoa Beer Joint Stock Company'
    },
    {
      code: 'TBX',
      companyName: 'Công ty Cổ phần Xi măng Thái Bình',
      exchange: 'HNX',
      shortName: 'Xi măng Thái Bình',
      companyNameEn: 'Thai Binh Cement Joint Stock Company'
    },
    {
      code: 'CAD',
      companyName: 'Công ty Cổ phần Chế biến và Xuất nhập khẩu Thủy sản Cadovimex ',
      exchange: 'UPCOM',
      shortName: 'Th.sản Cadovimex',
      companyNameEn: 'Cadovimex Seafood Import - Export And Processing Joint Stock Company'
    },
    {
      code: 'SSM',
      companyName: 'Công ty Cổ phần Chế tạo kết cấu thép VNECO.SSM',
      exchange: 'HNX',
      shortName: 'C.tạo kết cấu thép',
      companyNameEn: 'Steel Structure Manufacture Joint Stock Company'
    },
    {
      code: 'KSH',
      companyName: 'Công ty Cổ phần Damac GLS',
      exchange: 'UPCOM',
      shortName: 'Damac GLS',
      companyNameEn: 'DAMAC GLS JOINT STOCK COMPANY'
    },
    {
      code: 'HSG',
      companyName: 'Công ty Cổ phần Tập đoàn Hoa Sen ',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Hoa Sen',
      companyNameEn: 'HOA SEN Group'
    },
    {
      code: 'WTC',
      companyName: 'Công ty Cổ phần Vận tải thủy - Vinacomin',
      exchange: 'UPCOM',
      shortName: 'V.tải thủy Vinacomin',
      companyNameEn: 'VinaComin – Waterway Transport Joint Stock Company'
    },
    {
      code: 'MKV',
      companyName: 'Công ty Cổ phần Dược thú y Cai Lậy ',
      exchange: 'HNX',
      shortName: 'Dược thú y Cai Lậy',
      companyNameEn: 'CaiLay Veterinary Pharmaceutical Joint Stock Company'
    },
    {
      code: 'VGS',
      companyName: 'Công ty Cổ phần Ống thép Việt Đức VG PIPE',
      exchange: 'HNX',
      shortName: 'Ống thép Việt Đức',
      companyNameEn: 'Vietnam Germany Steel Pipe Joint Stock Company'
    },
    {
      code: 'SD8',
      companyName: 'Công ty Cổ phần Sông Đà 8',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 8',
      companyNameEn: 'Song Da 8 Joint Stock Company'
    },
    {
      code: 'DHT',
      companyName: 'Công ty Cổ phần Dược phẩm Hà Tây ',
      exchange: 'HNX',
      shortName: 'Dược phẩm Hà Tây',
      companyNameEn: 'Ha Tay Pharmaceutical Joint Stock Company'
    },
    {
      code: 'BST',
      companyName: 'Công ty Cổ phần Sách - Thiết bị Bình Thuận ',
      exchange: 'HNX',
      shortName: 'Sách Bình Thuận',
      companyNameEn: 'Binh Thuan Book and Equipment Joint Stock Company'
    },
    {
      code: 'QST',
      companyName: 'Công ty Cổ phần Sách và Thiết bị trường học Quảng Ninh',
      exchange: 'HNX',
      shortName: 'Sách Quảng Ninh',
      companyNameEn: 'Quang Ninh Book And Educational Equipment Joint Stock Company'
    },
    {
      code: 'VHL',
      companyName: 'Công ty Cổ phần Viglacera Hạ Long',
      exchange: 'HNX',
      shortName: 'Viglacera Hạ Long',
      companyNameEn: 'Viglacera Ha Long Joint Stock Company'
    },
    {
      code: 'V11',
      companyName: 'Công ty Cổ phần Xây dựng số 11',
      exchange: 'UPCOM',
      shortName: 'Xây dựng số 11',
      companyNameEn: 'Viet Nam Construction Joint Stock Company No11'
    },
    {
      code: 'MTC',
      companyName: 'Công ty Cổ phần Dịch vụ du lịch Mỹ Trà',
      exchange: 'UPCOM',
      shortName: 'DV du lịch Mỹ Trà',
      companyNameEn: 'My Tra Tourist Joint - Stock Company'
    },
    {
      code: 'PME',
      companyName: 'Công ty Cổ phần Pymepharco',
      exchange: 'HOSE',
      shortName: 'CTCP Pymepharco',
      companyNameEn: 'Pymepharco Joint Stock Company'
    },
    {
      code: 'PPH',
      companyName: 'Tổng Công ty Cổ phần Phong Phú',
      exchange: 'UPCOM',
      shortName: 'TCTCP Phong Phú',
      companyNameEn: 'Phong Phu Corporation'
    },
    {
      code: 'PVA',
      companyName: 'Công ty Cổ phần Tổng Công ty Xây lắp Dầu khí Nghệ An',
      exchange: 'UPCOM',
      shortName: 'X.lắp D.khí N.An',
      companyNameEn: 'PetroVietnam - Nghe An Construction Joint Stock Company'
    },
    {
      code: 'ACC',
      companyName: 'Công ty cổ phần Đầu tư và Xây dựng Bình Dương ACC',
      exchange: 'HOSE',
      shortName: 'Bình Dương ACC',
      companyNameEn: 'ACC Binh Duong Investment and Contstruction Joint Stock Company'
    },
    {
      code: 'BMJ',
      companyName: 'Công ty cổ phần khoáng sản Miền Đông AHP',
      exchange: 'UPCOM',
      shortName: 'Khoáng sản Miền Đông AHP',
      companyNameEn: 'Easterns AHP Minerals Joint Stock Company'
    },
    {
      code: 'OIL',
      companyName: 'Tổng Công ty Dầu Việt Nam – Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'TCT Dầu Việt Nam',
      companyNameEn: 'PETROVIETNAM OIL CORPORATION'
    },
    {
      code: 'SEB',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển điện miền Trung',
      exchange: 'HNX',
      shortName: 'Đ.tư điện M.Trung',
      companyNameEn: 'Mien Trung Power Investment and Development Joint - Stock Company'
    },
    {
      code: 'EVF',
      companyName: 'Công ty Tài chính Cổ phần Điện lực',
      exchange: 'UPCOM',
      shortName: 'Tài chính Điện lực',
      companyNameEn: 'EVN Finance Joint Stock Company'
    },
    {
      code: 'HAC',
      companyName: 'Công ty cổ phần Chứng khoán Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'CK Hải Phòng',
      companyNameEn: 'Hai Phong Securities Joint Stock Company'
    },
    {
      code: 'SRC',
      companyName: 'Công ty Cổ phần Cao su Sao vàng',
      exchange: 'HOSE',
      shortName: 'Cao su Sao Vàng',
      companyNameEn: 'Sao Vang Rubber Joint Stock Company'
    },
    {
      code: 'SHP',
      companyName: 'Công ty Cổ phần Thủy điện miền Nam ',
      exchange: 'HOSE',
      shortName: 'Th.điện Miền Nam',
      companyNameEn: 'Southern Hydropower Joint Stock Company'
    },
    {
      code: 'SDP',
      companyName: 'Công ty cổ phần SDP',
      exchange: 'UPCOM',
      shortName: 'CTCP SDP',
      companyNameEn: 'SDP Joint Stock Company'
    },
    {
      code: 'HVT',
      companyName: 'Công ty Cổ phần Hóa chất Việt Trì',
      exchange: 'HNX',
      shortName: 'Hóa chất Việt Trì',
      companyNameEn: 'Viet Tri Chemical Joint Stock Company'
    },
    {
      code: 'ICG',
      companyName: 'Công ty Cổ phần Xây dựng sông Hồng ',
      exchange: 'HNX',
      shortName: 'Xây dựng sông Hồng',
      companyNameEn: 'Song Hong Construction Joint Stock Company'
    },
    {
      code: 'BHC',
      companyName: 'Công ty Cổ phần Bê tông Biên Hòa ',
      exchange: 'UPCOM',
      shortName: 'Bê tông Biên Hòa',
      companyNameEn: 'Bien Hoa Concrete Joint Stock Company'
    },
    {
      code: 'ECI',
      companyName: 'Công ty Cổ phần Bản đồ và Tranh ảnh giáo dục',
      exchange: 'HNX',
      shortName: 'Tranh ảnh Giáo dục',
      companyNameEn: 'Education Cartography And Illustration Joint Stock Company'
    },
    {
      code: 'VDS',
      companyName: 'Công ty Cổ phần Chứng khoán Rồng Việt (VDSC)',
      exchange: 'HOSE',
      shortName: 'CK Rồng Việt',
      companyNameEn: 'Viet Dragon Securities Corporation'
    },
    {
      code: 'DZM',
      companyName: 'Công ty Cổ phần Chế tạo máy Dzĩ An ',
      exchange: 'HNX',
      shortName: 'Chế tạo máy Dzĩ An',
      companyNameEn: 'DZĩ An Manufacturing Public Limited Company'
    },
    {
      code: 'TGP',
      companyName: 'Công ty Cổ phần Trường Phú ',
      exchange: 'UPCOM',
      shortName: 'CTCP Trường Phú',
      companyNameEn: 'Truong Phu Joint Stock Company'
    },
    {
      code: 'PRO',
      companyName: 'Công ty Cổ phần Procimex Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Procimex Việt Nam',
      companyNameEn: 'PROCIMEX VIETNAM JOINT STOCK COMPANY'
    },
    {
      code: 'CFC',
      companyName: 'Công ty Cổ phần Cafico Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Cafico Việt Nam',
      companyNameEn: 'Cafico Vietnam Corporation'
    },
    {
      code: 'ABI',
      companyName: 'Công ty Cổ phần Bảo hiểm Ngân hàng Nông nghiệp (ABIC) ',
      exchange: 'UPCOM',
      shortName: 'Bảo hiểm Agribank',
      companyNameEn: 'Agriculture Bank Insurance Joint Stock Corporation'
    },
    {
      code: 'PPP',
      companyName: 'Công ty Cổ phần Dược phẩm Phong Phú',
      exchange: 'HNX',
      shortName: 'Dược Phong Phú',
      companyNameEn: 'Phong Phu Pharmaceutial Joint Stock Company'
    },
    {
      code: 'DCR',
      companyName: 'Công ty cổ phần Gạch Men Cosevco',
      exchange: 'UPCOM',
      shortName: 'Gạch Men Cosevco',
      companyNameEn: 'Cosevco Ceramic Tiles Joint Stock Company'
    },
    {
      code: 'DHC',
      companyName: 'Công ty Cổ phần Đông Hải Bến Tre ',
      exchange: 'HOSE',
      shortName: 'Đông Hải Bến Tre',
      companyNameEn: 'Dong Hai Joint Stock Company of Bentre'
    },
    {
      code: 'SHS',
      companyName: 'Công ty Cổ phần Chứng khoán Sài Gòn Hà Nội ',
      exchange: 'HNX',
      shortName: 'Chứng khoán SG HN',
      companyNameEn: 'Sai Gon - Ha Noi Securities Joint Stock Company'
    },
    {
      code: 'CLX',
      companyName: 'Công ty cổ phần Xuất nhập khẩu và đầu tư Chợ Lớn (Cholimex)',
      exchange: 'UPCOM',
      shortName: 'XNK & Đ.tư Chợ Lớn',
      companyNameEn: 'Cho Lon Investment and Import Export Corporation (Cholimex)'
    },
    {
      code: 'VRG',
      companyName: 'Công ty Cổ phần Phát triển đô thị và Khu công nghiệp Cao su Việt Nam',
      exchange: 'UPCOM',
      shortName: 'KCN Cao su VN',
      companyNameEn: 'Cao su Viet Nam Industrial Zone and Urban Development Joint stock company'
    },
    {
      code: 'S74',
      companyName: 'Công ty Cổ phần Sông Đà 7.04',
      exchange: 'HNX',
      shortName: 'CTCP Sông Đà 7.04',
      companyNameEn: 'Song Da 7.04 Joint Stock Company'
    },
    {
      code: 'AAM',
      companyName: 'Công ty Cổ phần Thủy sản Mekong',
      exchange: 'HOSE',
      shortName: 'Thủy sản Mekong',
      companyNameEn: 'MekongFisheries Joint Stock Company'
    },
    {
      code: 'EID',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển giáo dục Hà Nội',
      exchange: 'HNX',
      shortName: 'ĐTPT giáo dục HN',
      companyNameEn: 'Ha Noi Education Investment and Development Joint Sctock Company'
    },
    {
      code: 'VNT',
      companyName: 'Công ty Cổ phần Giao nhận Vận tải Ngoại thương',
      exchange: 'HNX',
      shortName: 'Vận Tải Ngoại Thương',
      companyNameEn: 'The Van cargoes and Foreign trade logistics Joint Stock Company'
    },
    {
      code: 'SED',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển giáo dục Phương Nam ',
      exchange: 'HNX',
      shortName: 'Giáo dục Phg Nam',
      companyNameEn: 'Phuong Nam Education Investment And Development Joint Stock Company'
    },
    {
      code: 'BKC',
      companyName: 'Công ty Cổ phần Khoáng sản Bắc Kạn ',
      exchange: 'HNX',
      shortName: 'K.sản Bắc Kạn',
      companyNameEn: 'Bac Kan Mineral Joint Stock Corporation'
    },
    {
      code: 'DAD',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển giáo dục Đà Nẵng ',
      exchange: 'HNX',
      shortName: 'ĐTPT Giáo dục ĐN',
      companyNameEn: 'Da Nang Education Development And Investment Joint Stock Company'
    },
    {
      code: 'VNF',
      companyName: 'Công ty cổ phần VINAFREIGHT',
      exchange: 'HNX',
      shortName: 'VINAFREIGHT',
      companyNameEn: 'Vinafreight Joint Stock Company'
    },
    {
      code: 'IDJ',
      companyName: 'Công ty cổ phần Đầu tư IDJ Việt Nam',
      exchange: 'HNX',
      shortName: 'Đầu tư IDJ Việt Nam',
      companyNameEn: 'IDJ VIETNAM INVESTMENT JOINT STOCK COMPANY'
    },
    {
      code: 'ATA',
      companyName: 'Công ty Cổ phần NTACO ',
      exchange: 'UPCOM',
      shortName: 'CTCP NTACO',
      companyNameEn: 'NTACO Joint Stock Company'
    },
    {
      code: 'HLG',
      companyName: 'Công ty Cổ phần Tập đoàn Hoàng Long',
      exchange: 'UPCOM',
      shortName: 'Hoàng Long Group',
      companyNameEn: 'Hoang Long Group'
    },
    {
      code: 'VPH',
      companyName: 'Công ty Cổ phần Vạn Phát Hưng ',
      exchange: 'HOSE',
      shortName: 'CTCP Vạn Phát Hưng',
      companyNameEn: 'Van Phat Hung Corporation'
    },
    {
      code: 'VNI',
      companyName: 'Công ty Cổ phần Đầu tư bất động sản Việt Nam',
      exchange: 'UPCOM',
      shortName: 'ĐT bất động sản VN',
      companyNameEn: 'Vien Nam Land Investment Corporation'
    },
    {
      code: 'SAS',
      companyName: 'Công ty Dịch vụ Hàng không sân bay Tân Sơn Nhất',
      exchange: 'UPCOM',
      shortName: 'DV sân bay T.S.Nhất',
      companyNameEn: 'Southern Airports Services Joint Stock Company'
    },
    {
      code: 'VMG',
      companyName: 'Công ty Cổ phần Thương mại và Dịch vụ dầu khí Vũng Tàu',
      exchange: 'UPCOM',
      shortName: 'Dầu khí Vũng Tàu',
      companyNameEn: 'Commercial Corporation and Petroleum Services Vungtau'
    },
    {
      code: 'NAG',
      companyName: 'Công ty Cổ phần Tập đoàn Nagakawa',
      exchange: 'HNX',
      shortName: 'Nagakawa Group',
      companyNameEn: 'Nagakawa Group Joint Stock Company'
    },
    {
      code: 'VC9',
      companyName: 'Công ty Cổ phần Xây dựng số 9 ',
      exchange: 'HNX',
      shortName: 'Xây dựng số 9',
      companyNameEn: 'Construction Joint Stock Company No 9'
    },
    {
      code: 'TNM',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu và Xây dựng công trình ',
      exchange: 'UPCOM',
      shortName: 'XNK & XD C.trình',
      companyNameEn: 'Tranimexco Transportation Import - Export And Construction Joint Stock Company'
    },
    {
      code: 'DC2',
      companyName: 'Công ty Cổ phần Đầu tư phát triển - Xây dựng (DIC) số 2',
      exchange: 'HNX',
      shortName: 'Xây dựng (DIC) 2',
      companyNameEn: 'Development Investment Construction Number 2 Joint Stock Company'
    },
    {
      code: 'MCG',
      companyName: 'Công ty Cổ phần Cơ điện và Xây dựng Việt Nam',
      exchange: 'HOSE',
      shortName: 'Cơ điện & XD VN',
      companyNameEn: 'Vietnam Mechanization Electrification & Construction Joint Stock Company'
    },
    {
      code: 'IDV',
      companyName: 'Công ty Cổ phần Phát triển hạ tầng Vĩnh Phúc',
      exchange: 'HNX',
      shortName: 'Hạ tầng Vĩnh Phúc',
      companyNameEn: 'Vinh Phuc Infrastructure Development Joint Stock Company'
    },
    {
      code: 'EFI',
      companyName: 'Công ty Cổ phần Đầu tư tài chính giáo dục',
      exchange: 'UPCOM',
      shortName: 'Tài chính Giáo dục',
      companyNameEn: 'Education Financial Investment Joint Stock Company'
    },
    {
      code: 'PMC',
      companyName: 'Công ty Cổ phần Dược phẩm dược liệu Pharmedic ',
      exchange: 'HNX',
      shortName: 'Dược Pharmedic',
      companyNameEn: 'Pharmedic Pharmaceutical Medicinal Joint Stock Company.'
    },
    {
      code: 'LGL',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Đô thị Long Giang',
      exchange: 'HOSE',
      shortName: 'Đô thị Long Giang',
      companyNameEn: 'Long Giang Investment and Urban Development Joint Stock Company'
    },
    {
      code: 'HDO',
      companyName: 'Công ty Cổ phần Hưng Đạo Container ',
      exchange: 'UPCOM',
      shortName: 'Hưng Đạo Container',
      companyNameEn: 'Hung Dao Container Joint Stock Company'
    },
    {
      code: 'VPC',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Năng lượng Việt Nam ',
      exchange: 'UPCOM',
      shortName: 'ĐTPT Năng lượng VN',
      companyNameEn: 'V- Power Investment and Development'
    },
    {
      code: 'BED',
      companyName: 'Công ty Cổ phần Sách và Thiết bị trường học Đà Nẵng',
      exchange: 'HNX',
      shortName: 'Sách T.bị Đà Nẵng',
      companyNameEn: 'Da Nang Books And School Equipment Joint Stock Company'
    },
    {
      code: 'GGG',
      companyName: 'Công ty Cổ phần Ô tô Giải Phóng',
      exchange: 'UPCOM',
      shortName: 'Ô tô Giải Phóng',
      companyNameEn: 'GiaiPhong Motor Joint Stock Company'
    },
    {
      code: 'TV2',
      companyName: 'Công ty Cổ phần Tư vấn Xây dựng điện 2',
      exchange: 'HOSE',
      shortName: 'Tư vấn XD điện 2',
      companyNameEn: 'Power Engineering Consulting Joint Stock Stock Company 2'
    },
    {
      code: 'HAD',
      companyName: 'Công ty Cổ phần Bia Hà Nội - Hải Dương',
      exchange: 'HNX',
      shortName: 'Bia HN Hải Dương',
      companyNameEn: 'Ha Noi - Hai Duong Beer Joint Stock Company'
    },
    {
      code: 'SDH',
      companyName: 'Công ty Cổ phần Xây dựng hạ tầng sông Đà ',
      exchange: 'UPCOM',
      shortName: 'XD hạ tầng sông Đà',
      companyNameEn: 'Song Da Infrastructure Construction Joint Stock Company'
    },
    {
      code: 'TMX',
      companyName: 'Công ty Cổ phần Vicem Thương mại xi măng ',
      exchange: 'HNX',
      shortName: 'Vicem T.mại X.măng',
      companyNameEn: 'VICEM Cement Trading Joint Stock Company'
    },
    {
      code: 'CMI',
      companyName: 'Công ty Cổ phần CMISTONE Việt Nam',
      exchange: 'UPCOM',
      shortName: 'CMISTONE Việt Nam',
      companyNameEn: 'Cmistone Viet Nam Joint Stock Company'
    },
    {
      code: 'GTH',
      companyName: 'Công ty Cổ phần Xây dựng - Giao thông Thừa Thiên Huế',
      exchange: 'UPCOM',
      shortName: 'XD - G.thông Huế',
      companyNameEn: 'Thua Thien Hue Construction Transportation Joint Stock Company'
    },
    {
      code: 'API',
      companyName: 'Công ty Cổ phần Đầu tư Châu Á - Thái Bình Dương',
      exchange: 'HNX',
      shortName: 'ĐT Châu Á - TBD',
      companyNameEn: 'Asia - Pacific  Investment Joint Stock Company'
    },
    {
      code: 'VIT',
      companyName: 'Công ty Cổ phần Viglacera Tiên Sơn ',
      exchange: 'HNX',
      shortName: 'Viglacera Tiên Sơn',
      companyNameEn: 'Viglacera Tien Son Joint Stock Company'
    },
    {
      code: 'CSC',
      companyName: 'Công ty cổ phần Tập đoàn COTANA',
      exchange: 'HNX',
      shortName: 'COTANA',
      companyNameEn: 'COTANA Group Joint Stock Company'
    },
    {
      code: 'MSN',
      companyName: 'Công ty Cổ phần Tập đoàn Ma San',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Ma San',
      companyNameEn: 'Masan Group Corp'
    },
    {
      code: 'PHC',
      companyName: 'Công ty Cổ phần Xây dựng Phục Hưng Holdings',
      exchange: 'HOSE',
      shortName: 'Phục Hưng Holdings',
      companyNameEn: 'Phuc Hung Holdings Construction Joint Stock Company'
    },
    {
      code: 'ACE',
      companyName: 'Công ty Cổ phần Bê tông ly tâm An Giang',
      exchange: 'UPCOM',
      shortName: 'Bê tông An Giang',
      companyNameEn: 'An Giang Centrifugal Concrete Joint Stock Company'
    },
    {
      code: 'PSP',
      companyName: 'Công ty Cổ phần Cảng Dịch vụ Dầu khí Đình Vũ',
      exchange: 'UPCOM',
      shortName: 'DV D.khí Đình Vũ',
      companyNameEn: 'Dinh Vu Petroleum Service Port Joint Stock Company'
    },
    {
      code: 'TH1',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Tổng hợp I Việt Nam ',
      exchange: 'UPCOM',
      shortName: 'XNK Tổng hợp I VN',
      companyNameEn: 'The Vietnam National General Export - Import Joint Stock Company No.1'
    },
    {
      code: 'GDT',
      companyName: 'Công ty Cổ phần Chế biến Gỗ Đức Thành ',
      exchange: 'HOSE',
      shortName: 'Gỗ Đức Thành',
      companyNameEn: 'Duc Thanh Wood Processing Joint Stock Company'
    },
    {
      code: 'TV3',
      companyName: 'Công ty Cổ phần Tư vấn xây dựng điện 3',
      exchange: 'HNX',
      shortName: 'Tư vấn XD điện 3',
      companyNameEn: 'Power Engineering Consulting Joint Stock Company'
    },
    {
      code: 'BXH',
      companyName: 'Công ty Cổ phần Vicem Bao bì Hải Phòng',
      exchange: 'HNX',
      shortName: 'Bao bì Hải Phòng',
      companyNameEn: 'Hai Phong Cement Packing Joint Stock Company'
    },
    {
      code: 'CT3',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng công trình 3',
      exchange: 'UPCOM',
      shortName: 'Công trình 3',
      companyNameEn: 'Project 3 Construction And Investment Joint Stock Company'
    },
    {
      code: 'GLT',
      companyName: 'Công ty Cổ phần Kỹ thuật điện toàn cầu',
      exchange: 'HNX',
      shortName: 'KT điện Toàn cầu',
      companyNameEn: 'Global Electrical Technologies Corporation'
    },
    {
      code: 'MHL',
      companyName: 'Công ty Cổ phần Minh Hữu Liên',
      exchange: 'HNX',
      shortName: 'CTCP Minh Hữu Liên',
      companyNameEn: 'Minh Huu Lien Joint Stock Company'
    },
    {
      code: 'V12',
      companyName: 'Công ty Cổ phần Xây dựng số 12',
      exchange: 'HNX',
      shortName: 'Xây dựng số 12',
      companyNameEn: 'Construction Joint Stock Company No 12'
    },
    {
      code: 'DVP',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển cảng Đình Vũ',
      exchange: 'HOSE',
      shortName: 'Cảng Đình Vũ',
      companyNameEn: 'Dinh Vu Port Investment And Development Joint Stock Company'
    },
    {
      code: 'TKC',
      companyName: 'Công ty Cổ phần Xây dựng và Kinh doanh địa ốc Tân Kỷ',
      exchange: 'HNX',
      shortName: 'Địa ốc Tân Kỷ',
      companyNameEn: 'Tanky Construction Real Estate Trading Corporation'
    },
    {
      code: 'ITD',
      companyName: 'Công ty Cổ phần Công nghệ Tiên Phong',
      exchange: 'HOSE',
      shortName: 'C.nghệ Tiên Phong',
      companyNameEn: 'Innovative Technology Development Corporation'
    },
    {
      code: 'PTP',
      companyName: 'Công ty Cổ phần Dịch vụ Viễn thông và In bưu điện',
      exchange: 'UPCOM',
      shortName: 'V.thông In bưu điện',
      companyNameEn: 'Post Printing and Tele communication Services Joint Stock Company'
    },
    {
      code: 'PTG',
      companyName: 'Công ty Cổ phần May xuất khẩu Phan Thiết ',
      exchange: 'UPCOM',
      shortName: 'May XK Phan Thiết',
      companyNameEn: 'Phan Thiet Garment Import - Export Joint Stock Company'
    },
    {
      code: 'VNX',
      companyName: 'Công ty Cổ phần Quảng cáo và Hội chợ thương mại',
      exchange: 'UPCOM',
      shortName: 'QC & Hội chợ T.mại',
      companyNameEn: 'Vietnam National Trade Fair & Advertising Company'
    },
    {
      code: 'DBM',
      companyName: 'Công ty Cổ phần Dược - Vật tư y tế Đăk Lăk ',
      exchange: 'UPCOM',
      shortName: 'V.tư y tế Đăk Lăk',
      companyNameEn: 'DAK LAK Pharmaceutical Medical Equipment Joint Stock Company'
    },
    {
      code: 'VIG',
      companyName: 'Công ty Cổ phần Chứng khoán Thương mại và Công nghiệp Việt Nam (VICS) ',
      exchange: 'HNX',
      shortName: 'Chứng khoán VICS',
      companyNameEn: 'Vietnam Industrial And Commercial Securities Corporation'
    },
    {
      code: 'TIG',
      companyName: 'Công ty Cổ phần Tập đoàn Đầu tư Thăng Long ',
      exchange: 'HNX',
      shortName: 'Đầu tư Thăng Long',
      companyNameEn: 'Thang Long Investment Group Joint Stock Company'
    },
    {
      code: 'TIE',
      companyName: 'Công ty Cổ phần TIE',
      exchange: 'UPCOM',
      shortName: 'CTCP TIE',
      companyNameEn: 'Telecommunications Industry Electronics Joint Stock Company'
    },
    {
      code: 'DID',
      companyName: 'Công ty Cổ phần DIC-Đồng Tiến ',
      exchange: 'UPCOM',
      shortName: 'DIC - Đồng Tiến',
      companyNameEn: 'DIC-Dong Tien Joint Stock Company'
    },
    {
      code: 'LIX',
      companyName: 'Công ty Cổ phần Bột giặt Lix',
      exchange: 'HOSE',
      shortName: 'CTCP Bột giặt Lix',
      companyNameEn: 'LIX Dettergent Joint Stock Company'
    },
    {
      code: 'WSS',
      companyName: 'Công ty Cổ phần Chứng khoán phố Wall',
      exchange: 'HNX',
      shortName: 'CK Phố Wall',
      companyNameEn: 'Wall Street Securities Company'
    },
    {
      code: 'SHN',
      companyName: 'Công ty Cổ phần Đầu tư Tổng hợp Hà Nội',
      exchange: 'HNX',
      shortName: 'ĐT Tổng hợp Hà Nội',
      companyNameEn: 'Hanoi Investment General Corporation'
    },
    {
      code: 'VFG',
      companyName: 'Công ty Cổ phần Khử trùng Việt Nam ',
      exchange: 'HNX',
      shortName: 'Khử trùng Việt Nam',
      companyNameEn: 'Vietnam Fumigation Joint Stock Company'
    },
    {
      code: 'V15',
      companyName: 'Công ty Cổ phần Xây dựng số 15',
      exchange: 'UPCOM',
      shortName: 'Xây dựng số 15',
      companyNameEn: 'Vinaconex 15 Joint Stock Company'
    },
    {
      code: 'VNG',
      companyName: 'Công ty Cổ phần Du lịch Thành Thành Công',
      exchange: 'HOSE',
      shortName: 'D.lịch T.Thành Công',
      companyNameEn: 'Thanh Thanh Cong Tourist Joint Stock Company'
    },
    {
      code: 'SQC',
      companyName: 'Công ty Cổ phần Khoáng sản Sài Gòn - Quy Nhơn ',
      exchange: 'UPCOM',
      shortName: 'K.sản SG - Q.Nhơn',
      companyNameEn: 'Sai Gon – Quy Nhon Mining Corporation'
    },
    {
      code: 'HGM',
      companyName: 'Công ty Cổ phần Cơ khí và Khoáng sản Hà Giang ',
      exchange: 'HNX',
      shortName: 'K.sản Hà Giang',
      companyNameEn: 'Ha Giang Mineral and Mechanics Joint Stock Company'
    },
    {
      code: 'DXG',
      companyName: 'Công ty Cổ phần Tập đoàn Đất Xanh',
      exchange: 'HOSE',
      shortName: 'Dat Xanh Group',
      companyNameEn: 'Dat Xanh Group Joint Stock Company'
    },
    {
      code: 'UDJ',
      companyName: 'Công ty Cổ phần Phát triển Đô thị - Becamex UDJ',
      exchange: 'UPCOM',
      shortName: 'Becamex UDJ',
      companyNameEn: 'Becamex Urban Development Joint Stock Company'
    },
    {
      code: 'DNC',
      companyName: 'Công ty Cổ phần Điện nước lắp máy Hải Phòng',
      exchange: 'HNX',
      shortName: 'Lắp máy Hải Phòng',
      companyNameEn: 'Hai Phong Electricity Water Machine Assembly Joint Stock'
    },
    {
      code: 'TPB',
      companyName: 'Ngân hàng Thương mại cổ phần Tiên Phong',
      exchange: 'HOSE',
      shortName: 'Ng.hàng Tiên Phong',
      companyNameEn: 'Tien Phong Commercial Joint Stock Bank'
    },
    {
      code: 'L44',
      companyName: 'Công ty Cổ phần Lilama 45.4',
      exchange: 'UPCOM',
      shortName: 'CTCP Lilama 45.4',
      companyNameEn: 'Lilama 45.4 Joint Stock Company'
    },
    {
      code: 'TCL',
      companyName: 'Công ty Cổ phần Đại lý giao nhận Vận tải xếp dỡ Tân Cảng ',
      exchange: 'HOSE',
      shortName: 'Vận tải Tân Cảng',
      companyNameEn: 'Tan Cang Logistics And Stevedoring Joint Stock Company'
    },
    {
      code: 'MAC',
      companyName: 'Công ty Cổ phần Cung ứng và Dịch vụ kỹ thuật hàng hải ',
      exchange: 'HNX',
      shortName: 'DV KT Hàng Hải',
      companyNameEn: 'Marine Supply And Engineering Service Joint Stock Company'
    },
    {
      code: 'PGT',
      companyName: 'Công ty cổ phần PGT Holdings',
      exchange: 'HNX',
      shortName: 'PGT Holdings',
      companyNameEn: 'PGT Holdings Joint Stock Company'
    },
    {
      code: 'TDC',
      companyName: 'Công ty Cổ phần Kinh doanh và Phát triển Bình Dương',
      exchange: 'HOSE',
      shortName: 'KD P.triển Bình Dg',
      companyNameEn: 'BinhDuong Trade And Development Joint Stock Company'
    },
    {
      code: 'HMH',
      companyName: 'Công ty Cổ phần Hải Minh ',
      exchange: 'HNX',
      shortName: 'CTCP Hải Minh',
      companyNameEn: 'HAI MINH Corporation'
    },
    {
      code: 'VIX',
      companyName: 'CÔNG TY CỔ PHẦN CHỨNG KHOÁN VIX',
      exchange: 'HOSE',
      shortName: 'CHỨNG KHOÁN VIX',
      companyNameEn: 'VIX SECURITIES JOINT STOCK COMPANY'
    },
    {
      code: 'AMV',
      companyName: 'Công ty Cổ phần Sản xuất kinh doanh dược và Trang thiết bị y tế Việt Mỹ',
      exchange: 'HNX',
      shortName: 'T.bị y tế Việt Mỹ',
      companyNameEn: 'American Vietnamese Biotech Incorporation'
    },
    {
      code: 'SHI',
      companyName: 'Công ty Cổ phần Quốc tế Sơn Hà',
      exchange: 'HOSE',
      shortName: 'Quốc tế Sơn Hà',
      companyNameEn: 'Son Ha International Corporation'
    },
    {
      code: 'CKV',
      companyName: 'Công ty Cổ phần COKYVINA ',
      exchange: 'HNX',
      shortName: 'COKYVINA',
      companyNameEn: 'COKYVINA Joint Stock Company'
    },
    {
      code: 'BDB',
      companyName: 'Công ty Cổ phần Sách và Thiết bị Bình Định ',
      exchange: 'HNX',
      shortName: 'Sách Bình Định',
      companyNameEn: 'Binh Đinh Book and Equipment Joint Stock Company'
    },
    {
      code: 'FDC',
      companyName: 'Công ty Cổ phần Ngoại thương và Phát triển Đầu tư Thành phố Hồ Chí Minh',
      exchange: 'HOSE',
      shortName: 'P.triển Đ.tư HCM',
      companyNameEn: 'Foreign Trade Development And Investement Corporation Of Ho Chi Minh City'
    },
    {
      code: 'DGT',
      companyName: 'Công ty Cổ phần Công trình giao thông Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'C.trình GT Đ.Nai',
      companyNameEn: 'DONA Transportation Construction Joint-Stock Company'
    },
    {
      code: 'IHK',
      companyName: 'Công ty Cổ phần In Hàng không ',
      exchange: 'UPCOM',
      shortName: 'In Hàng không',
      companyNameEn: 'Aviation Printing Joint Stock Company'
    },
    {
      code: 'SNC',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Thủy sản Năm Căn',
      exchange: 'UPCOM',
      shortName: 'Thủy sản Năm Căn',
      companyNameEn: 'Nam Can Seaproducts Import Export Joint Stock Company'
    },
    {
      code: 'TLH',
      companyName: 'Công ty Cổ phần Tập đoàn thép Tiến Lên',
      exchange: 'HOSE',
      shortName: 'Thép Tiến Lên',
      companyNameEn: 'Tienlen Steel Corporation Joint Stock Company'
    },
    {
      code: 'CGV',
      companyName: 'Công ty cổ phần Sành sứ Thủy tinh Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Sứ Thủy tinh VN',
      companyNameEn: 'Vietnam Ceramic Glass Joint stock company'
    },
    {
      code: 'TAG',
      companyName: 'Công ty Cổ phần Thế giới số Trần Anh',
      exchange: 'UPCOM',
      shortName: 'T.giới số Trần Anh',
      companyNameEn: 'Tran Anh Digital World Joint Stock Company'
    },
    {
      code: 'CPC',
      companyName: 'Công ty Cổ phần Thuốc sát trùng Cần Thơ',
      exchange: 'HNX',
      shortName: 'Sát trùng Cần Thơ',
      companyNameEn: 'Can Tho Pesticides Joint Stock Company'
    },
    {
      code: 'CMG',
      companyName: 'Công ty Cổ phần Tập đoàn Công nghệ CMC',
      exchange: 'HOSE',
      shortName: 'T.đoàn C.nghệ CMC',
      companyNameEn: 'CMC Corporation'
    },
    {
      code: 'TMT',
      companyName: 'Công ty Cổ phần Ô tô TMT ',
      exchange: 'HOSE',
      shortName: 'CTCP Ô tô TMT',
      companyNameEn: 'TMT Motors Corporation'
    },
    {
      code: 'INN',
      companyName: 'Công ty Cổ phần Bao bì và In nông nghiệp ',
      exchange: 'HNX',
      shortName: 'Bao bì In N.nghiệp',
      companyNameEn: 'Agriculure Printing And Packaging Joint Stock Company'
    },
    {
      code: 'NT2',
      companyName: 'Công ty Cổ phần Điện lực Dầu khí Nhơn Trạch 2 ',
      exchange: 'HOSE',
      shortName: 'Nhơn Trạch 2',
      companyNameEn: 'PetroVietnam Power NhonTrach 2 Joint Stock Company'
    },
    {
      code: 'POW',
      companyName: 'Tổng Công ty Điện lực Dầu khí Việt Nam – Công ty cổ phần',
      exchange: 'HOSE',
      shortName: 'PVPOWER',
      companyNameEn: 'PetroVietnam Power Corporation'
    },
    {
      code: 'TVG',
      companyName: 'Công ty Cổ phần Tư vấn đầu tư và Xây dựng giao thông vận tải',
      exchange: 'UPCOM',
      shortName: 'T.vấn Đ.tư XD GTVT',
      companyNameEn: 'Transport Investment And Construction Consultant Joint Stock Company'
    },
    {
      code: 'KDH',
      companyName: 'Công ty Cổ phần Đầu tư và Kinh doanh Nhà Khang Điền',
      exchange: 'HOSE',
      shortName: 'Nhà Khang Điền',
      companyNameEn: 'Khang Dien House Trading and Investment Joint Stock Company'
    },
    {
      code: 'APC',
      companyName: 'Công ty Cổ phần Chiếu xạ An Phú',
      exchange: 'HOSE',
      shortName: 'Chiếu xạ An Phú',
      companyNameEn: 'An Phu Irradiation Joint Stock Company'
    },
    {
      code: 'ADP',
      companyName: 'Công ty Cổ phần Sơn Á Đông ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sơn Á Đông',
      companyNameEn: 'A Dong Paint Stock Company'
    },
    {
      code: 'TTG',
      companyName: 'Công ty Cổ phần May Thanh Trì ',
      exchange: 'UPCOM',
      shortName: 'May Thanh Trì',
      companyNameEn: 'Thanh Tri Garment Joint Stock Company'
    },
    {
      code: 'HDG',
      companyName: 'Công ty Cổ phần Tập đoàn Hà Đô',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Hà Đô',
      companyNameEn: 'Ha Do Joint Stock Company'
    },
    {
      code: 'TLG',
      companyName: 'Công ty Cổ phần Tập đoàn Thiên Long',
      exchange: 'HOSE',
      shortName: 'Thiên Long Group',
      companyNameEn: 'Thien Long Group Corporation'
    },
    {
      code: 'HFC',
      companyName: 'Công ty cổ phần Xăng dầu HFC',
      exchange: 'UPCOM',
      shortName: 'X.dầu HFC',
      companyNameEn: 'HFC Pertroleum Corporarion'
    },
    {
      code: 'KBE',
      companyName: 'Công ty Cổ phần Sách - Thiết bị Trường học Kiên Giang ',
      exchange: 'UPCOM',
      shortName: 'Sách Kiên Giang',
      companyNameEn: 'Kien Giang Book and Equipment Joint Stock Company'
    },
    {
      code: 'TBT',
      companyName: 'Công ty Cổ phần Xây dựng Công trình Giao thông Bến Tre',
      exchange: 'UPCOM',
      shortName: 'C.trình GT Bến Tre',
      companyNameEn: 'Bentre Transportation Works Contruction Joint Stock Company'
    },
    {
      code: 'VBC',
      companyName: 'Công ty Cổ phần Nhựa - Bao bì Vinh ',
      exchange: 'HNX',
      shortName: 'Nhựa - Bao bì Vinh',
      companyNameEn: 'Vinh Plastic And Bags Joint Stock Company'
    },
    {
      code: 'PSB',
      companyName: 'Công ty Cổ phần Đầu tư Dầu khí Sao Mai - Bến Đình',
      exchange: 'UPCOM',
      shortName: 'Đ.tư DK S.Mai BĐ',
      companyNameEn: 'Sao Mai – Ben Dinh Petroleum Investment Joint Stock Company'
    },
    {
      code: 'VQC',
      companyName: 'Công ty Cổ phần Giám định Vinacomin',
      exchange: 'UPCOM',
      shortName: 'Gi.định Vinacomin',
      companyNameEn: 'Vinacomin-Quacontrol Joint Stock Company'
    },
    {
      code: 'PHH',
      companyName: 'Công ty Cổ phần Hồng Hà Việt Nam ',
      exchange: 'UPCOM',
      shortName: 'Hồng Hà Việt Nam',
      companyNameEn: 'Hong Ha Vietnam Joint Stock Company.'
    },
    {
      code: 'VCI',
      companyName: 'Công ty Cổ phần Chứng khoán Bản Việt',
      exchange: 'HOSE',
      shortName: 'CK Bản Việt',
      companyNameEn: 'Viet Capital Securities Joint stock company'
    },
    {
      code: 'CMT',
      companyName: 'Công ty Cổ phần Công nghệ Mạng và Truyền thông',
      exchange: 'UPCOM',
      shortName: 'C.nghệ mạng & Tr.thông',
      companyNameEn: 'Information And Networking Technology Joint Stock Company'
    },
    {
      code: 'DL1',
      companyName: 'Công ty Cổ phần Đầu tư phát triển dịch vụ công trình công cộng Đức Long Gia Lai',
      exchange: 'HNX',
      shortName: 'DV C.trình Đức Lg',
      companyNameEn: 'DucLong GiaLai Investment and Development of Public Project Service JSC'
    },
    {
      code: 'SDB',
      companyName: 'Công ty Cổ phần Sông Đà 207',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 207',
      companyNameEn: 'Song Da 207 Joint Stock Company'
    },
    {
      code: 'DLG',
      companyName: 'Công ty Cổ phần Tập đoàn Đức Long Gia Lai',
      exchange: 'HOSE',
      shortName: 'Đức Long Gia Lai',
      companyNameEn: 'Duc Long Gia Lai Group Joint Stock Company'
    },
    {
      code: 'NDC',
      companyName: 'Công ty Cổ phần Nam dược ',
      exchange: 'UPCOM',
      shortName: 'CTCP Nam dược',
      companyNameEn: 'Nam Duoc Joint Stock Company'
    },
    {
      code: 'CTI',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Cường Thuận IDICO',
      exchange: 'HOSE',
      shortName: 'Cường Thuận IDICO',
      companyNameEn: 'Cuong Thuan Idico Development Investment Corporation'
    },
    {
      code: 'PTH',
      companyName: 'Công ty Cổ phần Vận tải và Dịch vụ Petrolimex Hà Tây',
      exchange: 'UPCOM',
      shortName: 'V.tải Petro H.Tây',
      companyNameEn: 'Ha Tay Petrolimex Transportation and Service Joint Stock Company'
    },
    {
      code: 'LHG',
      companyName: 'Công ty Cổ phần Long Hậu ',
      exchange: 'HOSE',
      shortName: 'CTCP Long Hậu',
      companyNameEn: 'Long Hau Corporation'
    },
    {
      code: 'SDE',
      companyName: 'Công ty Cổ phần Kỹ thuật điện Sông Đà ',
      exchange: 'UPCOM',
      shortName: 'KT điện Sông Đà',
      companyNameEn: 'Song Da Electrical Engineering Joint Stock Company'
    },
    {
      code: 'BTG',
      companyName: 'Công ty Cổ phần Bao bì Tiền Giang',
      exchange: 'UPCOM',
      shortName: 'Bao bì Tiền Giang',
      companyNameEn: 'Tien Giang Packaging Joint Stock Company'
    },
    {
      code: 'DRH',
      companyName: 'Công ty Cổ phần DRH Holdings',
      exchange: 'HOSE',
      shortName: 'CTCP DRH Holdings',
      companyNameEn: 'DRH Holdings JSC'
    },
    {
      code: 'L35',
      companyName: 'Công ty Cổ phần Cơ khí lắp máy Lilama ',
      exchange: 'HNX',
      shortName: 'Cơ khí Lilama',
      companyNameEn: 'Erection Mechanical Joint Stock Company'
    },
    {
      code: 'STS',
      companyName: 'Công ty Cổ phần Dịch vụ Vận tải Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'DV V.tải Sài Gòn',
      companyNameEn: 'SaiGon Transport Agency Joint Stock Company'
    },
    {
      code: 'TVN',
      companyName: 'Tổng công ty Thép Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'TCT Thép Việt Nam',
      companyNameEn: 'VIET NAM STEEL CORPORATION'
    },
    {
      code: 'PPI',
      companyName: 'Công ty Cổ phần Phát triển hạ tầng và Bất động sản Thái Bình Dương ',
      exchange: 'UPCOM',
      shortName: 'BĐS Thái Bình Dg',
      companyNameEn: 'Pacific Property And Infrastructure Developement Joint Stock Company'
    },
    {
      code: 'DAG',
      companyName: 'Công ty Cổ phần Tập đoàn Nhựa Đông Á',
      exchange: 'HOSE',
      shortName: 'TĐ Nhựa Đông Á',
      companyNameEn: 'Donga Plastic Group Joint Stock Company'
    },
    {
      code: 'VNH',
      companyName: 'Công ty Cổ phần Thủy hải sản Việt Nhật',
      exchange: 'UPCOM',
      shortName: 'T.sản Việt Nhật',
      companyNameEn: 'Viet Nhat Seafood Corporation'
    },
    {
      code: 'VES',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng điện Mê Ca Vneco',
      exchange: 'UPCOM',
      shortName: 'XD Điện MêCa Vneco',
      companyNameEn: 'Meca Vneco Investment And Electricity Construction Joint Stock Company'
    },
    {
      code: 'BTT',
      companyName: 'Công ty Cổ phần Thương mại - Dịch vụ Bến Thành',
      exchange: 'HOSE',
      shortName: 'Thương mại DV Bến Thành',
      companyNameEn: 'Ben Thanh Trading And Service Joint Stock Company'
    },
    {
      code: 'CCI',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Công nghiệp Thương mại Củ Chi',
      exchange: 'HOSE',
      shortName: 'Thương mại Củ Chi',
      companyNameEn: 'CuChi Commercial And Industrial Developing Investment Joint Stock Company'
    },
    {
      code: 'PVL',
      companyName: 'Công ty cổ phần Đầu tư Nhà đất Việt',
      exchange: 'HNX',
      shortName: 'ĐT Nhà đất Việt',
      companyNameEn: 'Viet Property Investment Joint Stock Company'
    },
    {
      code: 'OGC',
      companyName: 'Công ty Cổ phần Tập đoàn Đại Dương ',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Đại Dương',
      companyNameEn: 'Ocean Group.,JSC'
    },
    {
      code: 'NTB',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Khai thác Công trình Giao thông 584',
      exchange: 'UPCOM',
      shortName: 'C.trình GT 584',
      companyNameEn: 'Transport Engineering Construction And Business Investment  Stock Company 584'
    },
    {
      code: 'POM',
      companyName: 'Công ty Cổ phần Thép Pomina',
      exchange: 'HOSE',
      shortName: 'Thép Pomina',
      companyNameEn: 'Pomina Steel Corporation'
    },
    {
      code: 'CHP',
      companyName: 'Công ty Cổ phần Thủy điện miền Trung',
      exchange: 'HOSE',
      shortName: 'Th.điện M.Trung',
      companyNameEn: 'Central Hydropower Joint Stock Company'
    },
    {
      code: 'SSF',
      companyName: 'Công ty Cổ phần Giáo dục Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Giáo dục Sài Gòn',
      companyNameEn: 'Saigon Education Joint Stock Company'
    },
    {
      code: 'CT6',
      companyName: 'Công ty Cổ phần Công trình 6',
      exchange: 'UPCOM',
      shortName: 'CTCP Công trình 6',
      companyNameEn: 'Construction joint stock company no6'
    },
    {
      code: 'TET',
      companyName: 'Công ty Cổ phần Vải sợi May mặc miền Bắc ',
      exchange: 'HNX',
      shortName: 'May mặc miền Bắc',
      companyNameEn: 'Northern Textiles And Garments Joint Stock Company'
    },
    {
      code: 'V21',
      companyName: 'Công ty Cổ phần Vinaconex 21',
      exchange: 'HNX',
      shortName: 'CTCP Vinaconex 21',
      companyNameEn: 'Vinaconex 21 Joint Stock Company'
    },
    {
      code: 'LCC',
      companyName: 'Công ty Cổ phần Xi măng Lạng Sơn ',
      exchange: 'UPCOM',
      shortName: 'Xi măng Lạng Sơn',
      companyNameEn: 'Lang Sơn Cenmens Jont Stock Company'
    },
    {
      code: 'PXI',
      companyName: 'Công ty Cổ phần Xây dựng Công nghiệp và Dân dụng Dầu khí',
      exchange: 'HOSE',
      shortName: 'CN Dân dụng D.khí',
      companyNameEn: 'Petroleum Industrial And Civil Construction Joint Stock Company'
    },
    {
      code: 'LIG',
      companyName: 'Công ty Cổ phần Licogi 13',
      exchange: 'HNX',
      shortName: 'CTCP Licogi 13',
      companyNameEn: 'Licogi 13 Joint Stock Company'
    },
    {
      code: 'QHD',
      companyName: 'Công ty Cổ phần Que hàn Việt Đức ',
      exchange: 'HNX',
      shortName: 'Que hàn Việt Đức',
      companyNameEn: 'Viet- Duc Welding Electrode Joint Stock Company'
    },
    {
      code: 'PSL',
      companyName: 'Công ty Cổ phần Chăn nuôi Phú Sơn',
      exchange: 'UPCOM',
      shortName: 'Chăn nuôi Phú Sơn',
      companyNameEn: 'Phu Son Livestock Joint Stock Company'
    },
    {
      code: 'PTT',
      companyName: 'Công ty Cổ phần Vận tải Dầu khí Đông Dương',
      exchange: 'UPCOM',
      shortName: 'D.khí Đông Dương',
      companyNameEn: 'Indochina Petroleum Transportation Joint Stock Company'
    },
    {
      code: 'VXB',
      companyName: 'Công ty Cổ phần Vật liệu xây dựng Bến Tre',
      exchange: 'HNX',
      shortName: 'VLXD Bến Tre',
      companyNameEn: 'Ben Tre Construction Material Joint Stock Company'
    },
    {
      code: 'KSD',
      companyName: 'Tổng Công ty Cổ phần Xuất khẩu Đông Nam Á Hamico ',
      exchange: 'HNX',
      shortName: 'Xuất khẩu Hamico',
      companyNameEn: 'South East Asia Export Joint Stock Company'
    },
    {
      code: 'DPP',
      companyName: 'Công ty Cổ phần Dược Đồng Nai ',
      exchange: 'UPCOM',
      shortName: 'Dược Đồng Nai',
      companyNameEn: 'Dong Nai Pharmaceutical Joint Stock Company'
    },
    {
      code: 'HPB',
      companyName: 'Công ty Cổ phần Bao bì PP',
      exchange: 'UPCOM',
      shortName: 'CTCP Bao bì PP',
      companyNameEn: 'PP Pack Marking Joint Stock Company'
    },
    {
      code: 'NVT',
      companyName: 'Công ty Cổ phần Bất động sản Du lịch Ninh Vân Bay',
      exchange: 'HOSE',
      shortName: 'BĐS Ninh Vân Bay',
      companyNameEn: 'Ninh Van Bay Travel Real Estate Joint Stock Company'
    },
    {
      code: 'DLR',
      companyName: 'Công ty Cổ phần Địa ốc Đà Lạt ',
      exchange: 'UPCOM',
      shortName: 'CTCP Địa ốc Đà Lạt',
      companyNameEn: 'Dalat Real Estate Joint Stock Company'
    },
    {
      code: 'DNY',
      companyName: 'Công ty Cổ phần Thép Dana - Ý ',
      exchange: 'UPCOM',
      shortName: 'Thép Dana - Ý',
      companyNameEn: 'DANA-Y Steel Joint Stock Company'
    },
    {
      code: 'VCR',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Du lịch Vinaconex',
      exchange: 'UPCOM',
      shortName: 'Du lịch Vinaconex',
      companyNameEn: 'Vinaconex Investment And Tourism Development Joint Stock Company'
    },
    {
      code: 'HTC',
      companyName: 'Công ty Cổ phần Thương mại Hóc Môn ',
      exchange: 'HNX',
      shortName: 'Thương mại Hóc Môn',
      companyNameEn: 'HOCMON Trade Joint Stock Company'
    },
    {
      code: 'VCM',
      companyName: 'Công ty Cổ phần Nhân lực và Thương mại Vinaconex ',
      exchange: 'HNX',
      shortName: 'N.lực Vinaconex',
      companyNameEn: 'Vinaconex Trading And Manpower Joint Stock Company'
    },
    {
      code: 'CX8',
      companyName: 'Công ty Cổ phần Đầu tư và Xây lắp Contrexim số 8 ',
      exchange: 'HNX',
      shortName: 'X.lắp Contrexim 8',
      companyNameEn: 'Constrexim No 8 Investment And Construction Join Stock Company'
    },
    {
      code: 'SPM',
      companyName: 'Công ty Cổ phần S.P.M ',
      exchange: 'HOSE',
      shortName: 'CTCP S.P.M',
      companyNameEn: 'S.P.M Corporation'
    },
    {
      code: 'KHB',
      companyName: 'Công ty Cổ phần Khoáng sản Hòa Bình',
      exchange: 'UPCOM',
      shortName: 'K.sản Hòa Bình',
      companyNameEn: 'Hoa Binh Mineral Joint Stock Company'
    },
    {
      code: 'LCS',
      companyName: 'Công ty Cổ phần Licogi 166 ',
      exchange: 'HNX',
      shortName: 'CTCP Licogi 166',
      companyNameEn: 'Licogi 16.6 Joint Stock Company'
    },
    {
      code: 'IN4',
      companyName: 'Công ty Cổ phần In số 4',
      exchange: 'UPCOM',
      shortName: 'CTCP In số 4',
      companyNameEn: 'No 4 Printing Joint Stock Company'
    },
    {
      code: 'HU1',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng HUD1',
      exchange: 'HOSE',
      shortName: 'ĐT Xây dựng HUD1',
      companyNameEn: 'HUD1 Investment And Construction Joint Stock Company'
    },
    {
      code: 'TNT',
      companyName: 'Công ty Cổ phần Tài Nguyên ',
      exchange: 'HOSE',
      shortName: 'CTCP Tài Nguyên',
      companyNameEn: 'Tai Nguyen Corporation'
    },
    {
      code: 'AME',
      companyName: 'Công ty Cổ phần Alphanam E&C',
      exchange: 'HNX',
      shortName: 'Alphanam E&C',
      companyNameEn: 'Alphanam E&C Joint Stock Company'
    },
    {
      code: 'PXT',
      companyName: 'Công ty Cổ phần Xây lắp Đường ống Bể chứa Dầu khí',
      exchange: 'HOSE',
      shortName: 'X.lắp Đ.ống D.khí',
      companyNameEn: 'Petroleum Pipeline & Tank Construction Joint Stock Company'
    },
    {
      code: 'SBA',
      companyName: 'Công ty Cổ phần Sông Ba',
      exchange: 'HOSE',
      shortName: 'CTCP Sông Ba',
      companyNameEn: 'Song Ba Joint Stock Company'
    },
    {
      code: 'PXS',
      companyName: 'Công ty Cổ phần Kết cấu Kim loại và Lắp máy Dầu khí',
      exchange: 'HOSE',
      shortName: 'Lắp máy D.khí',
      companyNameEn: 'Petroleum Equipment Assembly And Metal Structure Joinstock Company'
    },
    {
      code: 'DTL',
      companyName: 'Công ty Cổ phần Đại Thiên Lộc ',
      exchange: 'HOSE',
      shortName: 'CTCP Đại Thiên Lộc',
      companyNameEn: 'Dai Thien Loc Corporation'
    },
    {
      code: 'PHS',
      companyName: 'Công ty Cổ phần Chứng khoán Phú Hưng',
      exchange: 'UPCOM',
      shortName: 'Chứng khoán Phú Hưng',
      companyNameEn: 'Phu Hung Securities Corporation'
    },
    {
      code: 'HPT',
      companyName: 'Công ty Cổ phần Dịch vụ Công nghệ Tin học HPT ',
      exchange: 'UPCOM',
      shortName: 'Công nghệ HPT',
      companyNameEn: 'HPT Vietnam Corporation'
    },
    {
      code: 'PVR',
      companyName: 'Công ty Cổ phần Đầu tư PVR Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Đầu tư PVR Hà Nội',
      companyNameEn: 'Hanoi PVR Investment Joint Stock Company'
    },
    {
      code: 'PXM',
      companyName: 'Công ty Cổ phần Xây lắp Dầu khí miền Trung ',
      exchange: 'UPCOM',
      shortName: 'X.lắp DK M.Trung',
      companyNameEn: 'Mientrung Petroleum Construction Joint Stock Company'
    },
    {
      code: 'LDW',
      companyName: 'Công ty cổ phần Cấp thoát nước Lâm Đồng',
      exchange: 'UPCOM',
      shortName: 'Cấp thoát nước Lâm Đồng',
      companyNameEn: 'Lam Dong Water Supply And Sewerage Company Limited'
    },
    {
      code: 'BCE',
      companyName: 'Công ty Cổ phần Xây dựng và Giao thông Bình Dương',
      exchange: 'HOSE',
      shortName: 'XD & GT Bình Dg',
      companyNameEn: 'Binh Duong Construction And Civil Engineering Joint Stock Company'
    },
    {
      code: 'STK',
      companyName: 'Công ty Cổ phần Sợi thế kỷ ',
      exchange: 'HOSE',
      shortName: 'CTCP Sợi thế kỷ',
      companyNameEn: 'CENTURY SYNTHETIC FIBER CORPORATION'
    },
    {
      code: 'NNC',
      companyName: 'Công ty Cổ phần Đá Núi Nhỏ',
      exchange: 'HOSE',
      shortName: 'CTCP Đá Núi Nhỏ',
      companyNameEn: 'Nui Nho Stone Joint Stock Co'
    },
    {
      code: 'VE3',
      companyName: 'Công ty Cổ phần Xây dựng điện VNECO 3 ',
      exchange: 'HNX',
      shortName: 'XD Điện VNECO 3',
      companyNameEn: 'VNECO 3 Electricity Construction Joint Stock Company'
    },
    {
      code: 'VHH',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng Viwaseen Huế',
      exchange: 'UPCOM',
      shortName: 'XD Viwaseen Huế',
      companyNameEn: 'Viwaseen – Hue Investment And Contruction Joint-Stock Company'
    },
    {
      code: 'GTT',
      companyName: 'Công ty Cổ phần Thuận Thảo ',
      exchange: 'UPCOM',
      shortName: 'CTCP Thuận Thảo',
      companyNameEn: 'Thuan Thao Corporation'
    },
    {
      code: 'ICI',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng Công nghiệp',
      exchange: 'UPCOM',
      shortName: 'ĐT&XD Công nghiệp',
      companyNameEn: 'Industrial Construction and Investment Joint stock company'
    },
    {
      code: 'VIR',
      companyName: 'Công ty Cổ phần Du lịch Quốc tế Vũng Tàu ',
      exchange: 'UPCOM',
      shortName: 'D.lịch Q.tế V.Tàu',
      companyNameEn: 'Vung Tau Intourco Resort Joint Stock Company'
    },
    {
      code: 'NHA',
      companyName: 'Tổng Công ty Đầu tư Phát triển Nhà và Đô thị Nam Hà Nội',
      exchange: 'HOSE',
      shortName: 'Đô thị Nam Hà Nội',
      companyNameEn: 'Ha Noi South Housing And Urban Development Corporation'
    },
    {
      code: 'HBS',
      companyName: 'Công ty Cổ phần Chứng khoán Hòa Bình',
      exchange: 'HNX',
      shortName: 'CK Hòa Bình',
      companyNameEn: 'Hoa Binh Securities Joint Stock Company'
    },
    {
      code: 'PRC',
      companyName: 'Công ty Cổ phần Portserco',
      exchange: 'HNX',
      shortName: 'CTCP Portserco',
      companyNameEn: 'Portserco Joint Stock Company'
    },
    {
      code: 'VDN',
      companyName: 'Công ty Cổ phần Vinatex Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'Vinatex Đà Nẵng',
      companyNameEn: 'DANANG TEXTILE AND GARMENT MANUFACTURING IMPORT EXPORT JOINT STOCK COMPANY'
    },
    {
      code: 'AAA',
      companyName: 'Công ty cổ phần Nhựa An Phát Xanh',
      exchange: 'HOSE',
      shortName: 'Nhựa An Phát Xanh',
      companyNameEn: 'An Phat Bioplastics Joint Stock Company'
    },
    {
      code: 'VCT',
      companyName: 'Công ty Cổ phần Tư vấn Xây dựng Vinaconex',
      exchange: 'UPCOM',
      shortName: 'XD Vinaconex',
      companyNameEn: "Vinaconex's Construction Consultant Joint Stock Company"
    },
    {
      code: 'LDP',
      companyName: 'Công ty Cổ phần Dược Lâm Đồng - Ladophar',
      exchange: 'HNX',
      shortName: 'Dược Lâm Đồng',
      companyNameEn: 'Lamdong Pharmaceutical Joint Stock Company'
    },
    {
      code: 'CTX',
      companyName: 'Tổng Công ty Cổ phần Đầu tư xây dựng và Thương mại Việt Nam',
      exchange: 'HNX',
      shortName: 'Đ.tư XD T.mại VN',
      companyNameEn: 'Viet  Nam  Investment  Construction  and  Trading  Joint  Stock Corporation'
    },
    {
      code: 'DTA',
      companyName: 'Công ty Cổ phần Đệ Tam',
      exchange: 'HOSE',
      shortName: 'CTCP Đệ Tam',
      companyNameEn: 'De Tam Joint Stock Company'
    },
    {
      code: 'PMT',
      companyName: 'Công ty Cổ phần vật liệu bưu điện TELVINA',
      exchange: 'UPCOM',
      shortName: 'V.liệu b.điện TELVINA',
      companyNameEn: 'TELVINA Telecommunications Joint Stock Company'
    },
    {
      code: 'ND2',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển điện miền Bắc 2',
      exchange: 'UPCOM',
      shortName: 'Điện miền Bắc 2',
      companyNameEn: 'Northern Electricity Eevelopment And Investment Joint Stock Company No.2'
    },
    {
      code: 'VRC',
      companyName: 'Công ty cổ phần Bất động sản và Đầu tư VRC',
      exchange: 'HOSE',
      shortName: 'BĐS & Đ.tư VRC',
      companyNameEn: 'VRC Real Estate and Investment Joint stok company'
    },
    {
      code: 'SMT',
      companyName: 'Công ty Cổ phần Sametel',
      exchange: 'HNX',
      shortName: 'CTCP Sametel',
      companyNameEn: 'Sametel Corporation'
    },
    {
      code: 'TMB',
      companyName: 'Công ty Cổ phần Kinh doanh Than miền Bắc - Vinacomin',
      exchange: 'HNX',
      shortName: 'Than miền Bắc',
      companyNameEn: 'Vinacomin - North Coal Trading Joint Stock Company'
    },
    {
      code: 'HHG',
      companyName: 'Công ty Cổ phần Hoàng Hà ',
      exchange: 'HNX',
      shortName: 'CTCP Hoàng Hà',
      companyNameEn: 'Hoàng Ha Joint Stock Company'
    },
    {
      code: 'VLA',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Công nghệ Văn Lang',
      exchange: 'HNX',
      shortName: 'C.nghệ Văn Lang',
      companyNameEn: 'Van Lang Technology Development and Investment Joint Stock Company'
    },
    {
      code: 'VE2',
      companyName: 'Công ty Cổ phần Xây dựng Điện VNECO 2 ',
      exchange: 'HNX',
      shortName: 'XD Điện VNECO 2',
      companyNameEn: 'VNECO2 Electricity Construction Joint – Stock Company'
    },
    {
      code: 'PDR',
      companyName: 'Công ty Cổ phần Phát triển Bất động sản Phát Đạt ',
      exchange: 'HOSE',
      shortName: 'BĐS Phát Đạt',
      companyNameEn: 'Phat Dat Real Estate Development Corporation'
    },
    {
      code: 'CKG',
      companyName: 'CÔNG TY CÔ PHẦN TẬP ĐOÀN TƯ VẤN ĐẦU TƯ XÂY DỰNG KIÊN GIANG',
      exchange: 'HOSE',
      shortName: 'Xây dựng Kiên Giang',
      companyNameEn: 'KIEN GIANG CONSTRUCTION INVESTMENT CONSULTANCY GROUP'
    },
    {
      code: 'HPP',
      companyName: 'Công ty Cổ phần Sơn Hải Phòng ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sơn Hải Phòng',
      companyNameEn: 'Hai Phong Paint Join Stock Company'
    },
    {
      code: 'PCT',
      companyName: 'Công ty cổ phần Vận tải khí và Hóa chất Việt Nam',
      exchange: 'HNX',
      shortName: 'V.tải khí H.chất VN',
      companyNameEn: 'VIET NAM GAS AND CHEMICALS TRANSPORTATION CORPORATION'
    },
    {
      code: 'CLG',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Nhà đất Cotec ',
      exchange: 'HOSE',
      shortName: 'Nhà đất Cotec',
      companyNameEn: 'Cotec Investment And Land-House Development Joint Stock Company'
    },
    {
      code: 'CVN',
      companyName: 'CÔNG TY CỔ PHẦN VINAM',
      exchange: 'HNX',
      shortName: 'CTCP VINAM',
      companyNameEn: 'VINAM JOINT STOCK COMPANY'
    },
    {
      code: 'BVG',
      companyName: 'Công ty Cổ phần Thép Bắc Việt',
      exchange: 'UPCOM',
      shortName: 'Thép Bắc Việt',
      companyNameEn: 'BACVIET Steel Joint Stock Company'
    },
    {
      code: 'WSB',
      companyName: 'Công ty Cổ phần Bia Sài Gòn - Miền Tây',
      exchange: 'UPCOM',
      shortName: 'Bia SG Miền Tây',
      companyNameEn: 'Sai Gon Beer Western Joint Stock Company'
    },
    {
      code: 'ANT',
      companyName: 'Công ty Cổ phần Rau quả thực phẩm An Giang',
      exchange: 'UPCOM',
      shortName: 'R.quả Th.phẩm An Giang',
      companyNameEn: 'An Giang Fruit-vegetable & Foodstuff JSC'
    },
    {
      code: 'DNH',
      companyName: 'Công ty cổ phần Thủy điện Đa Nhim - Hàm Thuận - Đa Mi',
      exchange: 'UPCOM',
      shortName: 'Th.điện Đa Nhim',
      companyNameEn: 'Da Nhim - Ham Thuan - Da Mi Hydro Power Joint Stock Company'
    },
    {
      code: 'SFG',
      companyName: 'Công ty Cổ phần phân bón Miền Nam',
      exchange: 'HOSE',
      shortName: 'phân bón Miền Nam',
      companyNameEn: 'THE SOUTHERN FERTILIZER JOINT STOCK COMPANY'
    },
    {
      code: 'RCC',
      companyName: 'Công ty cổ phần Tổng Công ty Công trình Đường sắt',
      exchange: 'UPCOM',
      shortName: 'TCT C.trình Đ.sắt',
      companyNameEn: 'Railway Construction Corporation Joint Stock Company'
    },
    {
      code: 'BIC',
      companyName: 'Tổng Công ty Cổ phần Bảo Hiểm Ngân hàng Đầu tư và Phát triển Việt Nam ',
      exchange: 'HOSE',
      shortName: 'Bảo hiểm BIDV',
      companyNameEn: 'BIDV Insurance Corporation'
    },
    {
      code: 'VTX',
      companyName: 'Công ty cổ phần vận tải đa phương thức VIETRANSTIMEX',
      exchange: 'UPCOM',
      shortName: 'V.tải VIETRANSTIMEX',
      companyNameEn: 'VIETRANSTIMEX MULTIMODAL TRANSPORT HOLDING COMPANY'
    },
    {
      code: 'TFC',
      companyName: 'Công ty cổ phần Trang',
      exchange: 'HNX',
      shortName: 'CTCP Trang',
      companyNameEn: 'TRANG CORPORATION'
    },
    {
      code: 'CTR',
      companyName: 'Công ty cổ phần Công trình Viettel',
      exchange: 'UPCOM',
      shortName: 'Công trình Viettel',
      companyNameEn: 'Viettel Construction Joint Stock Company'
    },
    {
      code: 'NDN',
      companyName: 'Công ty Đầu tư Phát triển Nhà Đà Nẵng ',
      exchange: 'HNX',
      shortName: 'ĐTPT Nhà Đà Nẵng',
      companyNameEn: 'Danang Housing Investment Development Joint Stock Company'
    },
    {
      code: 'NQB',
      companyName: 'Công ty Cổ phần Cấp thoát nước Quảng Bình',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Q.Bình',
      companyNameEn: 'QUANG BINH WATER SUPPLY JOINT STOCK COMPANY'
    },
    {
      code: 'MIM',
      companyName: 'Công ty Cổ phần Khoáng sản và Cơ khí',
      exchange: 'HNX',
      shortName: 'K.sản & Cơ khí',
      companyNameEn: 'Mineral And Mechanical Joint Stock Company'
    },
    {
      code: 'TNP',
      companyName: 'Công ty cổ phần Cảng Thị Nại',
      exchange: 'UPCOM',
      shortName: 'Cảng Thị Nại',
      companyNameEn: 'Thi Nai Port Joint Stock Company'
    },
    {
      code: 'PIV',
      companyName: 'Công ty Cổ phần PIV',
      exchange: 'UPCOM',
      shortName: 'CTCP PIV',
      companyNameEn: 'PIV Joint Stock Company'
    },
    {
      code: 'HCI',
      companyName: 'Công ty Cổ phần Đầu tư - Xây dựng Hà Nội ',
      exchange: 'UPCOM',
      shortName: 'ĐT Xây dựng HN',
      companyNameEn: 'Hanoi Construction Investment Joint stock Company'
    },
    {
      code: 'LAS',
      companyName: 'Công ty Cổ phần Supe Phốt phát và Hóa chất Lâm Thao',
      exchange: 'HNX',
      shortName: 'Supe Phốt phát LT',
      companyNameEn: 'Lam Thao Fertilizers and Chemicals Joint Stock Company'
    },
    {
      code: 'TPS',
      companyName: 'Công ty Cổ phần Bến bãi vận tải Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Bến bãi V.tải SG',
      companyNameEn: 'SAIGONTRANSPORTATIONPARKINGJOINTSTOCKCOMPANY'
    },
    {
      code: 'APT',
      companyName: 'Công ty Cổ phần Kinh doanh Thủy hải sản Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Hải sản Sài Gòn',
      companyNameEn: 'SAIGON AQUATIC PRODUCTS TRADING JOINT STOCK COMPANY'
    },
    {
      code: 'VAF',
      companyName: 'Công ty Cổ phần Phân lân nung chảy Văn Điển',
      exchange: 'HOSE',
      shortName: 'Phân lân Văn Điển',
      companyNameEn: 'Van Dien Fused Magnesium Phosphate Fertilizer Joint Stock Company'
    },
    {
      code: 'C32',
      companyName: 'Công ty cổ phần CIC39',
      exchange: 'HOSE',
      shortName: 'CTCP CIC30',
      companyNameEn: 'CIC39 CORPORATION'
    },
    {
      code: 'VTP',
      companyName: 'Tổng công ty Cổ phần Bưu chính Viettel',
      exchange: 'UPCOM',
      shortName: 'Bưu chính Viettel',
      companyNameEn: 'Viettel Post Joint Stock Corporation'
    },
    {
      code: 'SWC',
      companyName: 'Tổng Công ty Cổ phần Đường sông Miền Nam ',
      exchange: 'UPCOM',
      shortName: 'Đg sông Miền Nam',
      companyNameEn: 'Southern Waterborne Transport Corporation'
    },
    {
      code: 'SMB',
      companyName: 'Công ty Cổ phần Bia Sài Gòn - Miền Trung ',
      exchange: 'HOSE',
      shortName: 'Bia SG Miền Trung',
      companyNameEn: 'Sai Gon -Mien Trung Beer Joint Stock Company'
    },
    {
      code: 'PVV',
      companyName: 'Công ty Cổ phần Vinaconex 39',
      exchange: 'UPCOM',
      shortName: 'Vinaconex 39',
      companyNameEn: 'Vinaconex 39 Joint Stock Company'
    },
    {
      code: 'NET',
      companyName: 'Công ty Cổ phần Bột giặt Net',
      exchange: 'HNX',
      shortName: 'CTCP Bột giặt Net',
      companyNameEn: 'Net Detergent Join Stock Company'
    },
    {
      code: 'SCL',
      companyName: 'Công ty Cổ phần Sông Đà Cao Cường',
      exchange: 'UPCOM',
      shortName: 'Sông Đà Cao Cường',
      companyNameEn: 'Song Da Cao Cuong Joint Stock Company'
    },
    {
      code: 'S27',
      companyName: 'Công ty Cổ phần Sông Đà 27 ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 27',
      companyNameEn: 'Songda Joint Stock Company No 27'
    },
    {
      code: 'ALV',
      companyName: 'Công ty Cổ phần Xây dựng ALVICO',
      exchange: 'UPCOM',
      shortName: 'CTCP ALVICO',
      companyNameEn: 'ALVICO Construction Joint Stock Company'
    },
    {
      code: 'SDK',
      companyName: 'Công ty Cổ phần Cơ khí Luyện kim ',
      exchange: 'UPCOM',
      shortName: 'Cơ khí Luyện kim',
      companyNameEn: 'Mechanical Engineering & Metallurgy Joint Stock Company'
    },
    {
      code: 'SCO',
      companyName: 'Công ty Cổ phần Công nghiệp Thủy sản',
      exchange: 'UPCOM',
      shortName: 'C.nghiệp Th.sản',
      companyNameEn: 'Seaproducts Mechanical Shareholding Company'
    },
    {
      code: 'HAT',
      companyName: 'Công ty Cổ phần Thương mại Bia Hà Nội ',
      exchange: 'HNX',
      shortName: 'Thương mại Bia HN',
      companyNameEn: 'Ha Noi Beer Trading Joint Stock Company'
    },
    {
      code: 'VMD',
      companyName: 'Công ty Cổ phần Y Dược phẩm Vimedimex ',
      exchange: 'HOSE',
      shortName: 'Y Dược Vimedimex',
      companyNameEn: 'Vimedimex Medi-Pharma Joint Stock Company'
    },
    {
      code: 'POV',
      companyName: 'Công ty Cổ phần Xăng dầu Dầu khí Vũng Áng',
      exchange: 'UPCOM',
      shortName: 'Dầu khí Vũng Áng',
      companyNameEn: 'Vung Ang Petroleum Joint Stock Company'
    },
    {
      code: 'MTP',
      companyName: 'Công ty cổ phần Dược Medipharco',
      exchange: 'UPCOM',
      shortName: 'Dược Medipharco',
      companyNameEn: 'Medipharco Pharmaceutical Joint Stock Company'
    },
    {
      code: 'PFL',
      companyName: 'Công ty Cổ phần Dầu khí Đông Đô',
      exchange: 'UPCOM',
      shortName: 'Dầu khí Đông Đô',
      companyNameEn: 'Petro Dong Do Joint Stock Company'
    },
    {
      code: 'PMJ',
      companyName: 'Công ty Cổ phần vật tư Bưu điện',
      exchange: 'UPCOM',
      shortName: 'vật tư Bưu điện',
      companyNameEn: 'P&T Material Supply Joint-Stock Company'
    },
    {
      code: 'PTL',
      companyName: 'Công ty Cổ phần Đầu tư hạ tầng và Đô thị Dầu khí ',
      exchange: 'HOSE',
      shortName: 'H.tầng Đ.thị D.khí',
      companyNameEn: 'Petro Capital Infrastructure Investment Joint Stock Company'
    },
    {
      code: 'OCH',
      companyName: 'Công ty Cổ phần Khách sạn và Dịch vụ OCH',
      exchange: 'HNX',
      shortName: 'Khách sạn và dịch vụ OCH',
      companyNameEn: 'OCH Hospitality & Service Joint stock company'
    },
    {
      code: 'PEC',
      companyName: 'Công ty Cổ phần Cơ khí Điện lực',
      exchange: 'UPCOM',
      shortName: 'Cơ khí Điện lực',
      companyNameEn: 'Power Engineering Joint Stock Company'
    },
    {
      code: 'CTA',
      companyName: 'Công ty Cổ phần Vinavico ',
      exchange: 'UPCOM',
      shortName: 'CTCP Vinavico',
      companyNameEn: 'Vinavico Joint Stock Company'
    },
    {
      code: 'APP',
      companyName: 'Công ty Cổ phần Phát triển Phụ gia và Sản phẩm dầu mỏ ',
      exchange: 'HNX',
      shortName: 'S.phẩm dầu mỏ',
      companyNameEn: 'Additives and Petroleum Products Joint Stock Company'
    },
    {
      code: 'KTB',
      companyName: 'Công ty Cổ phần Đầu tư Khoáng sản Tây Bắc',
      exchange: 'UPCOM',
      shortName: 'K.sản Tây Bắc',
      companyNameEn: 'Tay Bac Minerals Investment Joint Stock Company'
    },
    {
      code: 'SMA',
      companyName: 'Công ty Cổ phần Thiết bị phụ tùng Sài Gòn',
      exchange: 'HOSE',
      shortName: 'T.bị phụ tùng SG',
      companyNameEn: 'Saigon Machinery Spare Parts Joint Stock Company'
    },
    {
      code: 'QCC',
      companyName: 'Công ty Cổ phần Đầu tư xây dựng và phát triển hạ tầng viễn thông',
      exchange: 'UPCOM',
      shortName: 'ĐTPT H.tầng V.thông',
      companyNameEn: 'Construction investment and telecommunications infrastructure development joint stock company'
    },
    {
      code: 'ARM',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Hàng không',
      exchange: 'HNX',
      shortName: 'XNK Hàng không',
      companyNameEn: 'General Aviation Import Export Joint Stock Company'
    },
    {
      code: 'ELC',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Công nghệ điện tử - Viễn thông ',
      exchange: 'HOSE',
      shortName: 'C.nghệ Đ.tử V.thông',
      companyNameEn: 'Electronics Communications Technology Investment Development Corporation'
    },
    {
      code: 'FIT',
      companyName: 'Công ty cổ phần Tập đoàn F.I.T',
      exchange: 'HOSE',
      shortName: 'Tập đoàn F.I.T',
      companyNameEn: 'F.I.T Group Joint Stock Company'
    },
    {
      code: 'DSN',
      companyName: 'Công ty Cổ phần Công viên nước Đầm Sen',
      exchange: 'HOSE',
      shortName: 'CVN Đầm Sen',
      companyNameEn: 'Dam Sen Water Park Corporation'
    },
    {
      code: 'HQC',
      companyName: 'Công ty Cổ phần Tư vấn - Thương mại - Dịch vụ Địa ốc Hoàng Quân',
      exchange: 'HOSE',
      shortName: 'Địa ốc Hoàng Quân',
      companyNameEn: 'Hoang Quan Consulting – Trading – Service Real Estate Corporation'
    },
    {
      code: 'KAC',
      companyName: 'Công ty Cổ phần Đầu tư Địa ốc Khang An',
      exchange: 'UPCOM',
      shortName: 'ĐT Địa ốc Khang An',
      companyNameEn: 'Khang An Investment Real Estate Joint Stock Company'
    },
    {
      code: 'STU',
      companyName: 'Công ty Cổ phần Môi trường và Công trình Đô thị Sơn Tây',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị S.Tây',
      companyNameEn: 'SonTay Urban Construction And Environment Joint Stock Company'
    },
    {
      code: 'LM7',
      companyName: 'Công ty Cổ phần Lilama 7 ',
      exchange: 'HNX',
      shortName: 'CTCP Lilama 7',
      companyNameEn: 'Lilama 7 Joint Stock Company'
    },
    {
      code: 'KTT',
      companyName: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐẦU TƯ KTT',
      exchange: 'HNX',
      shortName: 'Điện Thiên Trường',
      companyNameEn: 'Thien Truong Investment Equipment and Construction Engineering Joint Stock Company'
    },
    {
      code: 'PX1',
      companyName: 'Công ty Cổ phần xi măng Dầu khí Nghệ An',
      exchange: 'UPCOM',
      shortName: 'Xi măng D.khí N.An',
      companyNameEn: 'Nghe An Petroleum cement joint stock company'
    },
    {
      code: 'DSP',
      companyName: 'Công ty Cổ phần Dịch vụ Du lịch Phú Thọ',
      exchange: 'UPCOM',
      shortName: 'Du lịch Phú Thọ',
      companyNameEn: 'Phu Tho Tourist Service Joint Stock Company'
    },
    {
      code: 'LCD',
      companyName: 'Công ty Cổ phần Lắp máy - Thí nghiệm cơ điện',
      exchange: 'HNX',
      shortName: 'Thí nghiệm cơ điện',
      companyNameEn: 'LILAMA- Electromechanics Testing Joint Stock'
    },
    {
      code: 'LM8',
      companyName: 'Công ty Cổ phần Lilama 18',
      exchange: 'HOSE',
      shortName: 'CTCP Lilama 18',
      companyNameEn: 'Lilama 18 Joint Stock Company'
    },
    {
      code: 'AVF',
      companyName: 'Công ty Cổ phần Việt An',
      exchange: 'UPCOM',
      shortName: 'CTCP Việt An',
      companyNameEn: 'Anvifish Joint-Stock Company'
    },
    {
      code: 'PXL',
      companyName: 'Công ty cổ phần Đầu tư Khu công nghiệp Dầu khí Long Sơn',
      exchange: 'UPCOM',
      shortName: 'KCN Dầu khí Long Sơn',
      companyNameEn: 'Long Son Petroleum Industrial Zone Investment Joint Stock Company'
    },
    {
      code: 'VTI',
      companyName: 'Công ty Cổ phần Sản xuất - Xuất nhập khẩu Dệt may',
      exchange: 'UPCOM',
      shortName: 'SX - XNK Dệt may',
      companyNameEn: 'Textile-Garment Import–Export and Production JS. Corporation'
    },
    {
      code: 'CMS',
      companyName: 'Công ty cổ phần CMVIETNAM',
      exchange: 'HNX',
      shortName: 'CTCP CMVIETNAM',
      companyNameEn: 'CMVIETNAM Joint Stock Company'
    },
    {
      code: 'VKC',
      companyName: 'Công ty Cổ phần Cáp Nhựa Vĩnh Khánh',
      exchange: 'HNX',
      shortName: 'Nhựa Vĩnh Khánh',
      companyNameEn: 'Vinh Khanh Cable Plastic Corporation'
    },
    {
      code: 'EVE',
      companyName: 'Công ty Cổ phần Everpia',
      exchange: 'HOSE',
      shortName: 'CTCP Everpia',
      companyNameEn: 'Everpia Joint Stock Company'
    },
    {
      code: 'VAT',
      companyName: 'Công ty cổ phần VT Vạn Xuân',
      exchange: 'HNX',
      shortName: 'VT Vạn Xuân',
      companyNameEn: 'Van Xuan VT Joint Stock Company'
    },
    {
      code: 'PV2',
      companyName: 'Công ty Cổ phần Đầu tư PV2 ',
      exchange: 'HNX',
      shortName: 'CTCP Đầu tư PV2',
      companyNameEn: 'PV2 Investment Joint Stock Company'
    },
    {
      code: 'BSC',
      companyName: 'Công ty Cổ phần Dịch vụ Bến Thành',
      exchange: 'HNX',
      shortName: 'DV Bến Thành',
      companyNameEn: 'Ben Thanh Service Joint Stock Company'
    },
    {
      code: 'HTI',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Hạ tầng IDICO',
      exchange: 'HOSE',
      shortName: 'ĐTPT Hạ tầng IDICO',
      companyNameEn: 'Idico Infrastructure Development Investment Joint Stock Company'
    },
    {
      code: 'KST',
      companyName: 'Công ty Cổ phần KASATI',
      exchange: 'HNX',
      shortName: 'CTCP KASATI',
      companyNameEn: 'Kasati Joint Stock Company'
    },
    {
      code: 'HUG',
      companyName: 'Tổng công ty May Hưng Yên - Công ty Cổ phần',
      exchange: 'UPCOM',
      shortName: 'May Hưng Yên',
      companyNameEn: 'Hung Yen Garment Corporation - Joint Stock Company'
    },
    {
      code: 'HDA',
      companyName: 'Công ty Cổ phần Hãng sơn Đông Á',
      exchange: 'HNX',
      shortName: 'Hãng sơn Đông Á',
      companyNameEn: 'Dong A Paint Joint Stock Company'
    },
    {
      code: 'ADC',
      companyName: 'Công ty Cổ phần Mĩ thuật và Truyền thông ',
      exchange: 'HNX',
      shortName: 'Mĩ thuật & Tr.thông',
      companyNameEn: 'Art Design & Communication Joint Stock Company'
    },
    {
      code: 'PCG',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Gas Đô thị',
      exchange: 'HNX',
      shortName: 'ĐTPT Gas Đô thị',
      companyNameEn: 'PetroVietNam Gas City Investment And Development Joint Stock Company'
    },
    {
      code: 'VIW',
      companyName: 'Tổng công ty Đầu tư Nước và Môi trường Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'TCT Môi trường VN',
      companyNameEn: 'Vietnam Water and Environment Investment Corporation - JSC'
    },
    {
      code: 'KTS',
      companyName: 'Công ty Cổ phần Đường Kon Tum ',
      exchange: 'HNX',
      shortName: 'CTCP Đường Kon Tum',
      companyNameEn: 'KonTum Sugar Joint Stock Company'
    },
    {
      code: 'HTL',
      companyName: 'Công ty Cổ phần Kỹ thuật và Ô tô Trường Long',
      exchange: 'HOSE',
      shortName: 'Ô tô Trường Long',
      companyNameEn: 'Truong Long Engineering And Auto Joint Stock Company'
    },
    {
      code: 'PTD',
      companyName: 'Công ty Cổ phần Thiết kế - Xây dựng - Thương mại Phúc Thịnh',
      exchange: 'HNX',
      shortName: 'T.mại Phúc Thịnh',
      companyNameEn: 'Phuc Thinh Design Construction Trading Corporation'
    },
    {
      code: 'SSG',
      companyName: 'Công ty Cổ phần Vận tải biển Hải Âu',
      exchange: 'UPCOM',
      shortName: 'V.tải biển Hải Âu',
      companyNameEn: 'Seagull Shipping Joint Stock Company'
    },
    {
      code: 'PPS',
      companyName: 'Công ty Cổ phần Dịch vụ kỹ thuật Điện lực Dầu khí Việt Nam ',
      exchange: 'HNX',
      shortName: 'KT Đ.lực DK VN',
      companyNameEn: 'PetroVietnam Power Services Joint Stock Company'
    },
    {
      code: 'TSB',
      companyName: 'Công ty Cổ phần Ắc quy Tia sáng',
      exchange: 'HNX',
      shortName: 'Ắc quy Tia sáng',
      companyNameEn: 'Tiasang Battery Joint stock compayny'
    },
    {
      code: 'TIS',
      companyName: 'Công ty Cổ phần Gang thép Thái Nguyên ',
      exchange: 'UPCOM',
      shortName: 'G.thép Thái Nguyên',
      companyNameEn: 'Thai Nguyen Iron and Steel Joint Stock Corporation'
    },
    {
      code: 'I40',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng 40 ',
      exchange: 'HNX',
      companyNameEn: '40 Investment And Construction Joint Stock Company'
    },
    {
      code: 'L40',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng 40 ',
      exchange: 'HNX',
      companyNameEn: '40 Investment And Construction Joint Stock Company'
    },
    {
      code: 'PCE',
      companyName: 'Công ty Cổ phần Phân bón và Hóa chất Dầu khí Miền Trung',
      exchange: 'HNX',
      shortName: 'H.chất DK M.Trung',
      companyNameEn: 'Central PetroVietnam Fertilizer and Chemicals Joint stock company'
    },
    {
      code: 'MDG',
      companyName: 'Công ty Cổ phần Miền Đông',
      exchange: 'HOSE',
      shortName: 'CTCP Miền Đông',
      companyNameEn: 'Mien Dong Joint Stock Company'
    },
    {
      code: 'NKG',
      companyName: 'Công ty Cổ phần Thép Nam Kim',
      exchange: 'HOSE',
      shortName: 'Thép Nam Kim',
      companyNameEn: 'Nam Kim Steel Joint Stock Company'
    },
    {
      code: 'BHT',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng Bạch Đằng TMC ',
      exchange: 'UPCOM',
      shortName: 'XD Bạch Đằng TMC',
      companyNameEn: 'Bach Dang TMC Construction Investment Joint Stock Company'
    },
    {
      code: 'MTH',
      companyName: 'Công ty Cổ phần Môi trường Đô thị Hà Đông',
      exchange: 'UPCOM',
      shortName: 'Đô thị Hà Đông',
      companyNameEn: 'Ha Dong Environment Public Service Joint Stock Company'
    },
    {
      code: 'VCF',
      companyName: 'Công ty Cổ phần Vinacafé Biên Hòa',
      exchange: 'HOSE',
      shortName: 'Vinacafé Biên Hòa',
      companyNameEn: 'Vinacafé Bien Hoa Joint Stock Company'
    },
    {
      code: 'KCE',
      companyName: 'Công ty Cổ phần Bê tông Ly tâm Điện lực Khánh Hòa',
      exchange: 'UPCOM',
      shortName: 'Bê tông Khánh Hòa',
      companyNameEn: 'KHANH HOA POWER CENTRIFUGAL CONCRETE JOINT STOCK COMPANY'
    },
    {
      code: 'DNM',
      companyName: 'Tổng Công ty Cổ phần Y tế Danameco ',
      exchange: 'HNX',
      shortName: 'Y tế Danameco',
      companyNameEn: 'Danameco Medical Joint - Stock Corporation'
    },
    {
      code: 'D11',
      companyName: 'Công ty Cổ phần Địa ốc 11',
      exchange: 'HNX',
      shortName: 'CTCP Địa ốc 11',
      companyNameEn: 'Real Estate 11 Joint Stock Company'
    },
    {
      code: 'MCF',
      companyName: 'Công ty Cổ phần Xây lắp Cơ khí và Lương thực Thực phẩm (Mecofood)',
      exchange: 'HNX',
      shortName: 'Th.phẩm Mecofood',
      companyNameEn: 'Mechanics Construction And Foodstuff Joint - Stock Company'
    },
    {
      code: 'DLD',
      companyName: 'Công ty Cổ phần Du lịch Đắc Lắk',
      exchange: 'UPCOM',
      shortName: 'Du lịch Đắc Lắk',
      companyNameEn: 'DakLak Tourist Joint-stock Company'
    },
    {
      code: 'FBA',
      companyName: 'Công ty Cổ phần Tập đoàn Quốc tế FBA',
      exchange: 'UPCOM',
      shortName: 'TĐ Quốc tế FBA',
      companyNameEn: 'FBA International Group Corporation'
    },
    {
      code: 'FSO',
      companyName: 'Công ty cổ phần Cơ khí đóng tàu thủy sản Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Đóng tàu th.sản VN',
      companyNameEn: 'Viet Nam Fishery Mechanical Shipbuilding Joint Stock Company'
    },
    {
      code: 'VCA',
      companyName: 'Công ty Cổ phần Thép VICASA - VNSTEEL',
      exchange: 'HOSE',
      shortName: 'Thép VICASA',
      companyNameEn: 'VNSTEEL - VICASA Joint Stock Company'
    },
    {
      code: 'PXA',
      companyName: 'Công ty Cổ phần Đầu tư và Thương mại Dầu khí Nghệ An',
      exchange: 'UPCOM',
      shortName: 'T.mại D.khí N.An',
      companyNameEn: 'Petrovietnam – Nghe An Investment & Trading Joint stock company'
    },
    {
      code: 'VDT',
      companyName: 'Công ty Cổ phần Lưới thép Bình Tây ',
      exchange: 'UPCOM',
      shortName: 'Lưới thép Bình Tây',
      companyNameEn: 'Binh Tay Steel Wire Netting Joint Stock Company'
    },
    {
      code: 'MDF',
      companyName: 'Công ty Cổ phần Gỗ MDF VRG - Quảng Trị',
      exchange: 'UPCOM',
      shortName: 'Gỗ MDF VRG Q.Trị',
      companyNameEn: 'Geruco-Quang Tri Wood Joint Stock Company'
    },
    {
      code: 'CCL',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Đô thị Dầu khí Cửu Long',
      exchange: 'HOSE',
      shortName: 'Đô thị DK Cửu Lg',
      companyNameEn: 'Cuu Long Petro Urban Development And Investment Corporation'
    },
    {
      code: 'SEP',
      companyName: 'Công ty Cổ phần Tổng Công ty Thương mại Quảng Trị',
      exchange: 'UPCOM',
      shortName: 'T.mại Quảng Trị',
      companyNameEn: 'Quang Tri General Trading Joint Stock Company'
    },
    {
      code: 'HU3',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng HUD3',
      exchange: 'HOSE',
      shortName: 'ĐT Xây dựng HUD3',
      companyNameEn: 'HUD3 Investment And Construction Joint Stock Company'
    },
    {
      code: 'PSG',
      companyName: 'Công ty Cổ phần Đầu tư và Xây lắp Dầu khí Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'X.lắp D.khí SG',
      companyNameEn: 'Petroleum Saigon Construction And Investment Joint Stock Company'
    },
    {
      code: 'H11',
      companyName: 'Công ty Cổ phần Xây dựng HUD101',
      exchange: 'UPCOM',
      shortName: 'Xây dựng HUD101',
      companyNameEn: 'HUD101 Construction Joint Stock Company'
    },
    {
      code: 'C47',
      companyName: 'Công ty Cổ phần Xây dựng 47',
      exchange: 'HOSE',
      shortName: 'CTCP Xây dựng 47',
      companyNameEn: 'Construction Joint Stock Company 47'
    },
    {
      code: 'DIH',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Xây dựng Hội An',
      exchange: 'HNX',
      shortName: 'Xây dựng Hội An',
      companyNameEn: 'Development investment Construction Hoi An Joint Stock Company'
    },
    {
      code: 'SDV',
      companyName: 'Công ty Cổ phần Dịch vụ Sonadezi ',
      exchange: 'UPCOM',
      shortName: 'DV Sonadezi',
      companyNameEn: 'Sonadezi Services Joint Stock Company'
    },
    {
      code: 'GHC',
      companyName: 'Công ty Cổ phần Thủy điện Gia Lai',
      exchange: 'UPCOM',
      shortName: 'Th.điện Gia Lai',
      companyNameEn: 'Gia Lai Hydropower Joint Stock Company'
    },
    {
      code: 'VIE',
      companyName: 'Công ty Cổ phần Công nghệ Viễn thông VITECO',
      exchange: 'HNX',
      shortName: 'C.nghệ V.thông VITECO',
      companyNameEn: 'VITECO Vietnam Telecommunications Technology Joint Stock Company'
    },
    {
      code: 'JVC',
      companyName: 'Công ty Cổ phần Thiết bị Y tế Việt Nhật',
      exchange: 'HOSE',
      shortName: 'T.bị Y tế Việt Nhật',
      companyNameEn: 'Japan Vietnam Medical Instrument Joint Stock Company'
    },
    {
      code: 'HNE',
      companyName: 'Công ty Cổ phần Hanel',
      exchange: 'UPCOM',
      shortName: 'Hanel',
      companyNameEn: 'Hanel Joint Stock Company'
    },
    {
      code: 'PTB',
      companyName: 'Công ty cổ phần Phú Tài',
      exchange: 'HOSE',
      shortName: 'CTCP Phú Tài',
      companyNameEn: 'Phu Tai Joint Stock Company'
    },
    {
      code: 'IDI',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Đa Quốc Gia IDI',
      exchange: 'HOSE',
      shortName: 'ĐTPT Đa Q.gia IDI',
      companyNameEn: 'International Development & Investment Corporation'
    },
    {
      code: 'CI5',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng số 5',
      exchange: 'UPCOM',
      shortName: 'Xây dựng số 5',
      companyNameEn: 'No.5 Construction Investment Joint Stock Company'
    },
    {
      code: 'INC',
      companyName: 'Công ty Cổ phần Tư vấn Đầu tư IDICO',
      exchange: 'HNX',
      shortName: 'Tư vấn Đ.tư IDICO',
      companyNameEn: 'IDICO Investment Consultancy Joint Stock Company'
    },
    {
      code: 'ISG',
      companyName: 'Công ty Cổ phần Vận tải biển và Hợp tác lao động quốc tế ',
      exchange: 'UPCOM',
      shortName: 'V.tải biển & LĐQT',
      companyNameEn: 'International Shipping and Labour Cooperation J.S.C'
    },
    {
      code: 'CIG',
      companyName: 'Công ty Cổ phần COMA18',
      exchange: 'HOSE',
      shortName: 'CTCP COMA18',
      companyNameEn: 'Coma18 Joint stock Company'
    },
    {
      code: 'PPE',
      companyName: 'Công ty Cổ phần Tư vấn Điện lực Dầu khí Việt Nam ',
      exchange: 'HNX',
      shortName: 'T.vấn Đ.lực DK VN',
      companyNameEn: 'PetroVietnam Power Engineering Consulting Joint Stock Company'
    },
    {
      code: 'GMX',
      companyName: 'Công ty Cổ phần Gạch Ngói Gốm Xây dựng Mỹ Xuân',
      exchange: 'HNX',
      shortName: 'Gạch XD Mỹ Xuân',
      companyNameEn: 'My Xuan Brick Tile Pottery and Construction Ioint Stock Company'
    },
    {
      code: 'FLC',
      companyName: 'Công ty Cổ phần Tập đoàn FLC',
      exchange: 'HOSE',
      shortName: 'Tập đoàn FLC',
      companyNameEn: 'FLC Group Joint Stock Company'
    },
    {
      code: 'IVS',
      companyName: 'Công ty Cổ phần Chứng khoán Đầu tư Việt Nam',
      exchange: 'HNX',
      shortName: 'CK Đầu tư VN',
      companyNameEn: 'Vietnam Investment Securities Company'
    },
    {
      code: 'L14',
      companyName: 'Công ty Cổ phần Licogi 14',
      exchange: 'HNX',
      shortName: 'CTCP Licogi 14',
      companyNameEn: 'Licogi 14 Joint Stock Company'
    },
    {
      code: 'STT',
      companyName: 'Công ty Cổ phần Vận chuyển Sài Gòn Tourist ',
      exchange: 'UPCOM',
      shortName: 'Sài Gòn Tourist',
      companyNameEn: 'SaiGon Tourist Transport Corporation'
    },
    {
      code: 'C21',
      companyName: 'Công ty Cổ phần Thế kỷ 21',
      exchange: 'UPCOM',
      shortName: 'CTCP Thế kỷ 21',
      companyNameEn: 'CENTURY 21 JOINT STOCK COMPANY'
    },
    {
      code: 'ITQ',
      companyName: 'Công ty Cổ phần Tập đoàn Thiên Quang',
      exchange: 'HNX',
      shortName: 'TĐ Thiên Quang',
      companyNameEn: 'Thien Quang Group Joint Stock Company'
    },
    {
      code: 'SVN',
      companyName: 'Công ty cổ phần Tập đoàn Vexilla Việt Nam',
      exchange: 'HNX',
      shortName: 'Tập đoàn Vexilla VN',
      companyNameEn: 'Vexilla Viet Nam Group Joint Stock Company'
    },
    {
      code: 'THG',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng Tiền Giang ',
      exchange: 'HOSE',
      shortName: 'ĐT XD Tiền Giang',
      companyNameEn: 'Tien Giang Investment and Construction Joint Stock Company'
    },
    {
      code: 'TCK',
      companyName: 'Tổng công ty Cơ khí xây dựng - CTCP',
      exchange: 'UPCOM',
      shortName: 'Cơ khí xây dựng',
      companyNameEn: 'Construction Machinery Corporation - JSC'
    },
    {
      code: 'DNL',
      companyName: 'Công ty Cổ phần Logistic Cảng Đà Nẵng ',
      exchange: 'UPCOM',
      shortName: 'Logistic Cảng ĐN',
      companyNameEn: 'Da Nang Logistics Joint Stock Company'
    },
    {
      code: 'LCM',
      companyName: 'Công ty Cổ phần Khai thác và Chế biến Khoáng sản Lào Cai ',
      exchange: 'HOSE',
      shortName: 'K.sản Lào Cai',
      companyNameEn: 'Lao Cai Mineral Exploitation & Processing Joint Stock Company'
    },
    {
      code: 'SVT',
      companyName: 'Công ty Cổ phần Công nghệ Sài Gòn Viễn Đông',
      exchange: 'HOSE',
      shortName: 'SG Viễn Đông',
      companyNameEn: 'SAI GON VIENDONG TECHNOLOGY JOINT STOCK COMPANY'
    },
    {
      code: 'CDN',
      companyName: 'Công ty Cổ phần Cảng Đà Nẵng',
      exchange: 'HNX',
      shortName: 'Cảng Đà Nẵng',
      companyNameEn: 'Danang Port Joint Stock Company'
    },
    {
      code: 'BCM',
      companyName: 'Tổng Công ty Đầu tư và Phát triển Công nghiệp - CTCP',
      exchange: 'HOSE',
      shortName: 'TCT ĐTPT C.Nghiệp',
      companyNameEn: 'Investment and Industrial Development Joint Stock Corporation'
    },
    {
      code: 'MEF',
      companyName: 'Công ty Cổ phần MEINFA',
      exchange: 'UPCOM',
      shortName: 'CTCP MEINFA',
      companyNameEn: 'MEINFA Joint Stock Company'
    },
    {
      code: 'HEM',
      companyName: 'Công ty cổ phần Chế tạo Điện cơ Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Điện cơ Hà Nội',
      companyNameEn: 'Hanoi Electromechanical Manufaturing Joint Stock Company'
    },
    {
      code: 'MBB',
      companyName: 'Ngân hàng Thương mại Cổ phần Quân đội ',
      exchange: 'HOSE',
      shortName: 'Ngân hàng Quân đội',
      companyNameEn: 'Military Commercial Joint Stock Bank'
    },
    {
      code: 'VGC',
      companyName: 'Tổng Công ty Viglacera - CTCP',
      exchange: 'HOSE',
      shortName: 'TCT Viglacera',
      companyNameEn: 'Viglacera Corporation - JSC'
    },
    {
      code: 'MIE',
      companyName: 'Tổng Công ty Máy và Thiết bị Công nghiệp - CTCP',
      exchange: 'UPCOM',
      shortName: 'Máy T.bị C.nghiệp',
      companyNameEn: 'Machines and Industrial Equipment Corporation'
    },
    {
      code: 'PSE',
      companyName: 'Công ty Cổ phần Phân Bón và Hóa Chất Dầu Khí Đông Nam Bộ ',
      exchange: 'HNX',
      shortName: 'H.chất DK Đ.N.Bộ',
      companyNameEn: 'South-East PetroVietNam Fertilizer Chemicals Joint Stock Company'
    },
    {
      code: 'VCX',
      companyName: 'Công ty Cổ phần Xi măng Yên Bình ',
      exchange: 'UPCOM',
      shortName: 'Xi măng Yên Bình',
      companyNameEn: 'YenBinh Cement Joint Stock Company'
    },
    {
      code: 'HFX',
      companyName: 'Công ty Cổ phần Sản xuất - Xuất nhập khẩu Thanh Hà ',
      exchange: 'UPCOM',
      shortName: 'SX - XNK Thanh Hà',
      companyNameEn: 'Thanh Ha Production and Import – Export Joint Stock Company'
    },
    {
      code: 'CNG',
      companyName: 'Công ty Cổ phần CNG Việt Nam',
      exchange: 'HOSE',
      shortName: 'CTCP CNG Việt Nam',
      companyNameEn: 'CNG Vietnam Joint Stock Company'
    },
    {
      code: 'AMC',
      companyName: 'Công ty Cổ phần Khoáng sản Á Châu',
      exchange: 'HNX',
      shortName: 'K.sản Á Châu',
      companyNameEn: 'Asia Mineral Join Stock Company'
    },
    {
      code: 'KHL',
      companyName: 'Công ty Cổ phần Khoáng sản và Vật liệu Xây dựng Hưng Long',
      exchange: 'UPCOM',
      shortName: 'VLXD Hưng Long',
      companyNameEn: 'Hung Long Mineral and Building Material Joint Stock Company'
    },
    {
      code: 'STV',
      companyName: 'Công ty Cổ phần Chế tác đá Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Chế tác đá VN',
      companyNameEn: 'Viet Nam Stone Work - Top Fabrication Joint Stock Company'
    },
    {
      code: 'HHS',
      companyName: 'Công ty Cổ phần Đầu tư - Dịch vụ Hoàng Huy ',
      exchange: 'HOSE',
      shortName: 'ĐT - DV Hoàng Huy',
      companyNameEn: 'Hoang Huy Investment Services joint Stock Company'
    },
    {
      code: 'ASA',
      companyName: 'Công ty Cổ phần Hàng tiêu dùng ASA',
      exchange: 'UPCOM',
      shortName: 'Hàng tiêu dùng ASA',
      companyNameEn: 'ASA Consumer Product Joint Stock Company'
    },
    {
      code: 'GSP',
      companyName: 'Công ty Cổ phần Vận tải Sản Phẩm khí Quốc Tế',
      exchange: 'HOSE',
      shortName: 'V.tải SP khí Q.Tế',
      companyNameEn: 'international gas product shipping joint stock company'
    },
    {
      code: 'MSB',
      companyName: 'Ngân hàng Thương mại Cổ phần Hàng Hải Việt Nam',
      exchange: 'HOSE',
      shortName: 'Ngân hàng MSB',
      companyNameEn: 'Vietnam Maritime Commercial Joint Stock Bank'
    },
    {
      code: 'VPB',
      companyName: 'Ngân hàng Thương mại Cổ phần Việt Nam thịnh vượng',
      exchange: 'HOSE',
      shortName: 'Ng.hàng Thịnh Vượng',
      companyNameEn: 'Vietnam Prosperity Joint Stock Commercial Bank'
    },
    {
      code: 'SII',
      companyName: 'Công ty Cổ phần Hạ tầng Nước Sài Gòn',
      exchange: 'HOSE',
      shortName: 'Hạ tầng Nước SG',
      companyNameEn: 'Sai Gon Water Infrastructure Corporation'
    },
    {
      code: 'PEG',
      companyName: 'Tổng Công ty Thương mại Kỹ thuật và Đầu tư - Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'TCT T.mại K.thuật',
      companyNameEn: 'PETEC Trading And Investment Corporation'
    },
    {
      code: 'DRL',
      companyName: 'Công ty Cổ phần Thủy Điện - Điện lực 3',
      exchange: 'HOSE',
      shortName: 'Th.Điện - Đ.lực 3',
      companyNameEn: 'Hydro Power Joint Stock Company – Power No.3'
    },
    {
      code: 'GAS',
      companyName: 'Tổng Công ty Khí Việt Nam - CTCP',
      exchange: 'HOSE',
      shortName: 'TCT Khí Việt Nam',
      companyNameEn: 'PetroVietNam Gas Joint Stock Corporation'
    },
    {
      code: 'MED',
      companyName: 'CÔNG TY CỔ PHẦN DƯỢC TRUNG ƯƠNG MEDIPLANTEX',
      exchange: 'HNX',
      shortName: 'Dược TW MEDIPLANTEX',
      companyNameEn: 'MEDIPLANTEX NATIONAL PHARMACEUTICAL JOINT STOCK COMPANY'
    },
    {
      code: 'LKW',
      companyName: 'Công ty Cổ phần Cấp nước Long Khánh',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Long Khánh',
      companyNameEn: 'Long Khanh Water Supply Joint Stock Company'
    },
    {
      code: 'LMC',
      companyName: 'Công ty cổ phần Khoáng sản Latca',
      exchange: 'UPCOM',
      shortName: 'K.sản Latca',
      companyNameEn: 'Latca Mineral Joint Stock Company'
    },
    {
      code: 'PRT',
      companyName: 'Tổng Công ty cổ phần Sản xuất – Xuất nhập khẩu Bình Dương',
      exchange: 'UPCOM',
      shortName: 'XNK Bình Dương',
      companyNameEn: 'Binh Duong Producing and Trading Goods Corporation'
    },
    {
      code: 'DHM',
      companyName: 'Công ty cổ phần thương mại và khai thác khoáng sản Dương Hiếu',
      exchange: 'HOSE',
      shortName: 'P.triển Dương Hiếu',
      companyNameEn: 'DUONG HIEU TRADING AND MINING JOINT STOCK COMPANY'
    },
    {
      code: 'FCN',
      companyName: 'Công ty Cổ phần FECON',
      exchange: 'HOSE',
      shortName: 'CTCP FECON',
      companyNameEn: 'FECON Corporation'
    },
    {
      code: 'VE8',
      companyName: 'Công ty Cổ phần Xây dựng Điện Vneco 8 ',
      exchange: 'HNX',
      shortName: 'XD Điện VNECO 8',
      companyNameEn: 'Vneco8 Electricity Construction Joint Stock Company'
    },
    {
      code: 'SNZ',
      companyName: 'Tổng Công ty Cổ phần Phát triển khu Công Nghiệp',
      exchange: 'UPCOM',
      shortName: 'TCT P.triển KCN',
      companyNameEn: 'Sonadezi Corporation'
    },
    {
      code: 'VE4',
      companyName: 'Công ty Cổ phần xây dựng điện VNECO 4 ',
      exchange: 'HNX',
      shortName: 'XD Điện VNECO 4',
      companyNameEn: 'VNECO4 Electricity Construction Joint Stock Company'
    },
    {
      code: 'E12',
      companyName: 'CÔNG TY CỔ PHẦN XÂY DỰNG ĐIỆN VNECO12',
      exchange: 'UPCOM',
      shortName: 'XÂY DỰNG ĐIỆN VNECO12',
      companyNameEn: 'VNECO12 ELECTRICITY CONTRUCTION JOINT STOCK COMPANY'
    },
    {
      code: 'HU4',
      companyName: 'Công ty Cổ phần Đầu tư và Xây dựng HUD4',
      exchange: 'UPCOM',
      shortName: 'ĐT Xây dựng HUD4',
      companyNameEn: 'HUD4 Investment and Construction Joint Stock Company'
    },
    {
      code: 'PID',
      companyName: 'Công ty Cổ phần Trang trí nội thất Dầu khí ',
      exchange: 'UPCOM',
      shortName: 'Nội thất Dầu khí',
      companyNameEn: 'Petroleum Interior Decoration Joint Stock Company'
    },
    {
      code: 'EMC',
      companyName: 'Công ty Cổ phần Cơ Điện Thủ Đức',
      exchange: 'HOSE',
      shortName: 'Cơ Điện Thủ Đức',
      companyNameEn: 'ThuDuc Electro-Mechanical Joint Stock Company'
    },
    {
      code: 'SPI',
      companyName: 'Công ty Cổ phần SPI',
      exchange: 'HNX',
      shortName: 'CTCP SPI',
      companyNameEn: 'SPI Joint Stock Company'
    },
    {
      code: 'SLS',
      companyName: 'Công ty Cổ phần Mía đường Sơn La ',
      exchange: 'HNX',
      shortName: 'Mía đường Sơn La',
      companyNameEn: 'Son La Sugar Joint Stock Company'
    },
    {
      code: 'PTK',
      companyName: 'Công ty Cổ phần Luyện Kim Phú Thịnh',
      exchange: 'UPCOM',
      shortName: 'L.Kim Phú Thịnh',
      companyNameEn: 'Phu Thinh Metallurgy Joint Stock Company'
    },
    {
      code: 'LPB',
      companyName: 'Ngân hàng Thương mại Cổ phần Bưu điện Liên Việt',
      exchange: 'HOSE',
      shortName: 'LienVietPostBank',
      companyNameEn: 'Lien Viet Post Joint Stock Commercial Bank'
    },
    {
      code: 'BVB',
      companyName: 'Ngân hàng TMCP Bản Việt',
      exchange: 'UPCOM',
      shortName: 'Ngân hàng Bản Việt',
      companyNameEn: 'Viet Capital Commercial Joint Stock Bank'
    },
    {
      code: 'PDT',
      companyName: 'Công ty cổ phần Thương mại Dầu khí Đồng Tháp',
      exchange: 'UPCOM',
      shortName: 'TM D.khí Đồng Tháp',
      companyNameEn: 'Dongthap Petroleum Trading Import Export Joint Stock Company'
    },
    {
      code: 'VFS',
      companyName: 'Công ty cổ phần chứng khoán Nhất Việt',
      exchange: 'UPCOM',
      shortName: 'CK Nhất Việt',
      companyNameEn: 'Viet First Securities Corporation'
    },
    {
      code: 'TVB',
      companyName: 'Công ty Cổ phần Chứng khoán Trí Việt',
      exchange: 'HOSE',
      shortName: 'CK Trí Việt',
      companyNameEn: 'TRI VIET SECURITIES JOINT STOCK CORPORATION'
    },
    {
      code: 'DCI',
      companyName: 'Công ty cổ phần Công nghiệp hóa chất Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'CN hóa chất ĐN',
      companyNameEn: 'Danang Chemical Industries Joint Stock Company'
    },
    {
      code: 'SHA',
      companyName: 'Công ty Cổ phần Sơn Hà Sài Gòn',
      exchange: 'HOSE',
      shortName: 'Sơn Hà Sài Gòn',
      companyNameEn: 'Son Ha Sai Gon Joint Stock Company'
    },
    {
      code: 'BHP',
      companyName: 'Công ty Cổ phần Bia Hà Nội - Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Bia HN Hải Phòng',
      companyNameEn: 'Ha Noi - Hai Phong Beer Joint Stock Company'
    },
    {
      code: 'HAR',
      companyName: 'Công ty Cổ phần Đầu tư Thương mại Bất động sản An Dương Thảo Điền',
      exchange: 'HOSE',
      shortName: 'BĐS An Dg Th.Điền',
      companyNameEn: 'An Duong Thao Dien Real Estate Trade Joint Stock Company'
    },
    {
      code: 'TTZ',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Công nghệ Tiến Trung',
      exchange: 'HNX',
      shortName: 'C.nghệ Tiến Trung',
      companyNameEn: 'Tien Trung Investment Construction And Technology Joint Stock Company'
    },
    {
      code: 'BCG',
      companyName: 'Công ty Cổ phần Bamboo Capital',
      exchange: 'HOSE',
      shortName: 'Bamboo Capital',
      companyNameEn: 'Bamboo Capital Joint Stock Company'
    },
    {
      code: 'DHP',
      companyName: 'Công ty Cổ phần Điện Cơ Hải Phòng',
      exchange: 'HNX',
      shortName: 'Điện Cơ Hải Phòng',
      companyNameEn: 'Hai Phong Electrical Mechanical Joint Stock Company'
    },
    {
      code: 'HLD',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Bất động sản HUDLAND',
      exchange: 'HNX',
      shortName: 'BĐS HUDLAND',
      companyNameEn: 'HUDLAND Real Estate Investment and Development Joint Stock Company'
    },
    {
      code: 'FCM',
      companyName: 'Công ty Cổ phần Khoáng sản FECON ',
      exchange: 'HOSE',
      shortName: 'K.sản FECON',
      companyNameEn: 'FECON Mining Joint Stock Company'
    },
    {
      code: 'PSD',
      companyName: 'Công ty Cổ phần Dịch vụ Phân phối Tổng hợp Dầu khí ',
      exchange: 'HNX',
      shortName: 'P.phối T.hợp D.khí',
      companyNameEn: 'Petroleum General Distribution Services Joint Stock Company'
    },
    {
      code: 'TIP',
      companyName: 'Công ty Cổ phần Phát triển Khu công nghiệp Tín Nghĩa',
      exchange: 'HOSE',
      shortName: 'KCN Tín Nghĩa',
      companyNameEn: 'Tin Nghia Industrial Park Devepment Joint Stock Company'
    },
    {
      code: 'NDX',
      companyName: 'Công ty Cổ phần Xây lắp Phát triển Nhà Đà Nẵng',
      exchange: 'HNX',
      shortName: 'X.lắp Nhà Đà Nẵng',
      companyNameEn: 'Danang Housing Development joint stock company'
    },
    {
      code: 'KSQ',
      companyName: 'Công ty cổ phần CNC Capital Việt Nam',
      exchange: 'HNX',
      shortName: 'CNC Capital VN',
      companyNameEn: 'CNC Capital Viet Nam Joint-Stock Company'
    },
    {
      code: 'PGV',
      companyName: 'Tổng Công ty Phát điện 3 - Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'Phát điện 3',
      companyNameEn: 'Power Generation Joint Stock Corporation 3'
    },
    {
      code: 'TMG',
      companyName: 'Công ty cổ phần Kim loại màu Thái Nguyên - Vimico',
      exchange: 'UPCOM',
      shortName: 'K.loại Thái Nguyên',
      companyNameEn: 'Thainguyen Non Ferous Metals Joint Stock Company'
    },
    {
      code: 'KLF',
      companyName: 'Công ty cổ phần Đầu tư Thương mại và Xuất nhập khẩu CFS',
      exchange: 'HNX',
      shortName: 'Đ.tư T.mại XNH CFS',
      companyNameEn: 'CFS Investment And Import Export Trading Joint Stock Company'
    },
    {
      code: 'UEM',
      companyName: 'Công ty Cổ phần cơ điện Uông Bí',
      exchange: 'UPCOM',
      shortName: 'Cơ điện Uông Bí',
      companyNameEn: 'Vinacomin - Uong Bi Electric Mechanical Joint Stock Company'
    },
    {
      code: 'AFX',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Nông sản thực phẩm An Giang',
      exchange: 'UPCOM',
      shortName: 'XNK N.sản An Giang',
      companyNameEn: 'An Giang Agriculture and Foods Import-Export Joint Stock Company'
    },
    {
      code: 'CLL',
      companyName: 'Công ty Cổ phần Cảng Cát Lái',
      exchange: 'HOSE',
      shortName: 'Cảng Cát Lái',
      companyNameEn: 'CAT LAI PORT JOINT STOCK COMPANY'
    },
    {
      code: 'THS',
      companyName: 'Công ty Cổ phần Thanh Hoa - Sông Đà',
      exchange: 'HNX',
      shortName: 'Thanh Hoa Sông Đà',
      companyNameEn: 'Song Da - Thanh Hoa Joint Stock Company'
    },
    {
      code: 'SCS',
      companyName: 'Công ty Cổ phần Dịch vụ Hàng hóa Sài Gòn',
      exchange: 'HOSE',
      shortName: 'DV Hàng hóa SG',
      companyNameEn: 'Sai Gon Cargo Service Corporation'
    },
    {
      code: 'HTG',
      companyName: 'Tổng Công ty Cổ phần Dệt May Hòa Thọ',
      exchange: 'UPCOM',
      shortName: 'Dệt May Hòa Thọ',
      companyNameEn: 'Hoa Tho Textile - Garment Joint stock company'
    },
    {
      code: 'SID',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Sài Gòn CO.OP',
      exchange: 'UPCOM',
      shortName: 'Sài Gòn CO.OP',
      companyNameEn: 'Sai Gon CO.OP Investment Development Joint Stock Company'
    },
    {
      code: 'VGI',
      companyName: 'Tổng Công ty cổ phần Đầu tư Quốc tế Viettel',
      exchange: 'UPCOM',
      shortName: 'Đ.tư Q.tế Viettel',
      companyNameEn: 'Viettel Global Investment Joint Stock Company'
    },
    {
      code: 'EIC',
      companyName: 'Công ty Cổ phần EVN Quốc tế',
      exchange: 'UPCOM',
      shortName: 'CTCP EVN Quốc tế',
      companyNameEn: 'EVN International Joint Stock Company'
    },
    {
      code: 'DVC',
      companyName: 'Công ty Cổ phần Thương mại dịch vụ tổng hợp Cảng Hải Phòng ',
      exchange: 'UPCOM',
      shortName: 'DV Cảng H.Phòng',
      companyNameEn: 'Hai Phong Port Trading and Services Joint Stock Company'
    },
    {
      code: 'PDV',
      companyName: 'Công ty Cổ phần Vận tải Dầu Phương Đông Việt',
      exchange: 'UPCOM',
      shortName: 'V.tải dầu P.Đông Việt',
      companyNameEn: 'Phuong Dong Viet Transportation Oil J.S.C'
    },
    {
      code: 'PVB',
      companyName: 'Công ty Cổ phần Bọc Ống Dầu khí Việt Nam ',
      exchange: 'HNX',
      shortName: 'Bọc Ống D.khí VN',
      companyNameEn: 'PetroVietnam Coating Joint Stock Company'
    },
    {
      code: 'KSK',
      companyName: 'Công ty Cổ phần Khoáng sản Luyện kim màu ',
      exchange: 'UPCOM',
      shortName: 'K.sản L.kim màu',
      companyNameEn: 'Mineral Ferrous Metallergy Joint Stock Company'
    },
    {
      code: 'TSJ',
      companyName: 'Công ty Cổ phần Du lịch Dịch vụ Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Du lịch DV Hà Nội',
      companyNameEn: 'Hanoi Tourist Service Joint - Stock Company'
    },
    {
      code: 'NFC',
      companyName: 'Công ty Cổ phần Phân lân Ninh Bình ',
      exchange: 'HNX',
      shortName: 'Phân lân Ninh Bình',
      companyNameEn: 'Ninh Binh Phosphate Fertilizer Joint Stock Company'
    },
    {
      code: 'CEC',
      companyName: 'Công ty Cổ phần Thiết kế Công nghiệp Hóa chất ',
      exchange: 'UPCOM',
      shortName: 'T.kế CN Hóa chất',
      companyNameEn: 'Chemical Industry Engineering Joint Stock Company'
    },
    {
      code: 'AC4',
      companyName: 'Công ty cổ phần ACC - 244',
      exchange: 'UPCOM',
      shortName: 'CTCP ACC - 244',
      companyNameEn: 'ACC - 244 Joint Stock Company'
    },
    {
      code: 'DP3',
      companyName: 'Công ty Cổ phần Dược phẩm Trung ương 3',
      exchange: 'HNX',
      shortName: 'Dược phẩm TW 3',
      companyNameEn: 'Central Pharmaceutical Joint Stock Company No 3'
    },
    {
      code: 'PXC',
      companyName: 'Công ty cổ phần Phát triển Đô thị Dầu khí',
      exchange: 'UPCOM',
      shortName: 'P.triển Đô thị DK',
      companyNameEn: 'PetroVietnam Urban Development Joint Stock Company'
    },
    {
      code: 'CAT',
      companyName: 'Công ty Cổ phần Thủy sản Cà Mau',
      exchange: 'UPCOM',
      shortName: 'Thủy sản Cà Mau',
      companyNameEn: 'Ca Mau Joint Stock Seafoods Company'
    },
    {
      code: 'TNS',
      companyName: 'Công ty Cổ phần Thép Tấm Lá Thống Nhất',
      exchange: 'UPCOM',
      shortName: 'Thép Tấm Th.Nhất',
      companyNameEn: 'Thong Nhat Flat Steel Joint Stock Company'
    },
    {
      code: 'LEC',
      companyName: 'Công ty Cổ phần Bất động sản Điện lực Miền Trung',
      exchange: 'HOSE',
      shortName: 'BĐS Đ.lực M.Trung',
      companyNameEn: 'Central power Real Estate Joint stock company'
    },
    {
      code: 'MCH',
      companyName: 'Công ty cổ phần Hàng Tiêu Dùng Masan',
      exchange: 'UPCOM',
      shortName: 'Tiêu Dùng Masan',
      companyNameEn: 'Masan Consumer Corporation'
    },
    {
      code: 'HC3',
      companyName: 'Công ty Cổ phần Xây dựng số 3 Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'XD số 3 Hải Phòng',
      companyNameEn: 'HaiPhong Construction Joint Stock Company No3'
    },
    {
      code: 'PVY',
      companyName: 'Công ty cổ phần Chế tạo Giàn khoan Dầu khí',
      exchange: 'UPCOM',
      shortName: 'Giàn khoan D.khí',
      companyNameEn: 'PetrovietNam Marine Shipyard Joint Stock Company'
    },
    {
      code: 'PDB',
      companyName: 'Công ty Cổ phần Vật liệu Xây dựng DUFAGO',
      exchange: 'HNX',
      shortName: 'Vật liệu Xây dựng DUFAGO',
      companyNameEn: 'DUFAGO CONSTRUCTION MATERIALS CORPORATION'
    },
    {
      code: 'SKG',
      companyName: 'Công ty Cổ phần Tàu cao tốc Superdong – Kiên Giang ',
      exchange: 'HOSE',
      shortName: 'Superdong Kiên Giang',
      companyNameEn: 'Superdong Fast Ferry Kien Giang Joint Stock Company'
    },
    {
      code: 'MIG',
      companyName: 'Tổng Công ty Cổ phần Bảo Hiểm Quân Đội',
      exchange: 'HOSE',
      shortName: 'Bảo Hiểm Quân Đội',
      companyNameEn: 'Military Insurance Corporation'
    },
    {
      code: 'RCD',
      companyName: 'Công ty Cổ phần xây dựng - địa ốc cao su ',
      exchange: 'UPCOM',
      shortName: 'XD - địa ốc cao su',
      companyNameEn: 'RUBBER  REAL  ESTATE  CONSTRUCTION  JOINT STOCK COMPANY'
    },
    {
      code: 'CNC',
      companyName: 'Công ty Cổ phần Công nghệ cao Traphaco',
      exchange: 'UPCOM',
      shortName: 'C.nghệ Traphaco',
      companyNameEn: 'Traphaco high tech joint stock company'
    },
    {
      code: 'SCI',
      companyName: 'Công ty cổ phần SCI E&C',
      exchange: 'HNX',
      shortName: 'CTCP SCI E&C',
      companyNameEn: 'SCI E&C Joint stock company'
    },
    {
      code: 'HJC',
      companyName: 'Công ty Cổ phần Hòa Việt ',
      exchange: 'UPCOM',
      shortName: 'CTCP Hòa Việt',
      companyNameEn: 'HOAVIET JOINSTOCK COMPANY'
    },
    {
      code: 'HNG',
      companyName: 'Công ty Cổ phần Nông nghiệp Quốc tế Hoàng Anh Gia Lai',
      exchange: 'HOSE',
      shortName: 'Nông nghiệp HAGL',
      companyNameEn: 'Hoang Anh Gia Lai Agricultural Joint Stock Company'
    },
    {
      code: 'TTN',
      companyName: 'Công ty Cổ phần Công nghệ và Truyền thông Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Truyền thông VN',
      companyNameEn: 'Vietnam Technology & Telecommunication Joint Stock Company'
    },
    {
      code: 'CH5',
      companyName: 'Công ty cổ phần xây dựng số 5 Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Xây dựng số 5 HN',
      companyNameEn: 'Hanoi Construction Joint stock company No5'
    },
    {
      code: 'QPH',
      companyName: 'Công ty Cổ phần thủy điện Quế Phong',
      exchange: 'UPCOM',
      shortName: 'Th.điện Quế Phong',
      companyNameEn: 'Que Phong Hydropower Joint Stock Company'
    },
    {
      code: 'CPI',
      companyName: 'Công ty Cổ phần Đầu tư Cảng Cái Lân',
      exchange: 'UPCOM',
      shortName: 'Cảng Cái Lân',
      companyNameEn: 'Cai Lan Port Investment Joint-Stock Company'
    },
    {
      code: 'MWG',
      companyName: 'Công ty Cổ phần đầu tư thế giới di động',
      exchange: 'HOSE',
      shortName: 'Thế Giới Di Động',
      companyNameEn: 'MOBILE WORLD INVESTMENT CORPORATION'
    },
    {
      code: 'NCS',
      companyName: 'Công ty cổ phần Suất ăn hàng không Nội Bài',
      exchange: 'UPCOM',
      shortName: 'Suất ăn HK Nội Bài',
      companyNameEn: 'Noibai Catering Services Joint Stock Company'
    },
    {
      code: 'VMS',
      companyName: 'Công ty Cổ phần Phát triển Hàng hải',
      exchange: 'HNX',
      shortName: 'P.triển Hàng hải',
      companyNameEn: 'Vietnam Maritime Development Joint Stock Company'
    },
    {
      code: 'TVP',
      companyName: 'Công ty Cổ phần Dược phẩm TV.Pharm',
      exchange: 'UPCOM',
      shortName: 'Dược TV.Pharm',
      companyNameEn: 'TV.Pharm Pharmaceutical Joint Stock Company'
    },
    {
      code: 'ITS',
      companyName: 'Công ty Cổ phần Đầu tư, Thương mại và Dịch vụ - Vinacomin',
      exchange: 'UPCOM',
      shortName: 'T.mại DV Vinacomin',
      companyNameEn: 'Vinacomin – Investment, Trading and Service Joint Stock Company'
    },
    {
      code: 'DGC',
      companyName: 'Công ty cổ phần Tập đoàn Hóa chất Đức Giang',
      exchange: 'HOSE',
      shortName: 'Hóa chất Đức Giang',
      companyNameEn: 'Duc Giang Chemicals Group Joint Sock Company'
    },
    {
      code: 'CCH',
      companyName: 'Công ty cổ phần Tư vấn và Đầu tư Xây dựng CCIC Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Xây dựng CCIC HN',
      companyNameEn: 'Ha Noi Consultant and construction investment Joint Stock Company'
    },
    {
      code: 'DLT',
      companyName: 'Công ty cổ phần du lịch và thương mại - VINACOMIN',
      exchange: 'UPCOM',
      shortName: 'T.mại VINACOMIN',
      companyNameEn: 'Vinacomin - Tourism  Joint Stock Company'
    },
    {
      code: 'IFC',
      companyName: 'Công ty cổ phần thực phẩm công nghệ Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'T.phẩm Công nghệ SG',
      companyNameEn: 'SAIGON INDUSTRIAL FOODSTUFFS JOINT STOCK COMPANY'
    },
    {
      code: 'PNG',
      companyName: 'Công ty cổ phần thương mại Phú Nhuận',
      exchange: 'UPCOM',
      shortName: 'T.mại Phú Nhuận',
      companyNameEn: 'PHU NHUAN TRADING JOINT STOCK COMPANY'
    },
    {
      code: 'CTT',
      companyName: 'Công ty Cổ phần chế tạo máy - VINACOMIN',
      exchange: 'HNX',
      shortName: 'C.tạo máy VINACOMIN',
      companyNameEn: 'Vinacomin - Machinery Joint Stock Company'
    },
    {
      code: 'DCF',
      companyName: 'Công ty Cổ phần Xây dựng và Thiết kế Số 1',
      exchange: 'UPCOM',
      shortName: 'XD & Thiết kế Số 1',
      companyNameEn: 'Design and Construction Joint Stock Company No.1'
    },
    {
      code: 'PIC',
      companyName: 'Công ty Cổ phần Đầu tư Điện lực 3',
      exchange: 'HNX',
      shortName: 'Đầu tư Điện lực 3',
      companyNameEn: 'PC3-Investment Joint Stock Company'
    },
    {
      code: 'BT1',
      companyName: 'Công ty cổ phần bảo vệ thực vật 1 Trung Ương',
      exchange: 'UPCOM',
      shortName: 'B.vệ thực vật 1 TW',
      companyNameEn: 'Central Plant Protection JSC No.1'
    },
    {
      code: 'NAS',
      companyName: 'Công ty Cổ phần Dịch vụ Hàng không Sân bay Nội Bài',
      exchange: 'UPCOM',
      shortName: 'DV sân bay Nội Bài',
      companyNameEn: 'Noibai Airport Services Joint Stock Company'
    },
    {
      code: 'VCW',
      companyName: 'Công ty cổ phần Đầu tư Nước sạch Sông Đà',
      exchange: 'UPCOM',
      shortName: 'Nước Sông Đà',
      companyNameEn: 'Song Da Water Investment JSC'
    },
    {
      code: 'HPI',
      companyName: 'Công ty cổ phần khu công nghiệp Hiệp Phước',
      exchange: 'UPCOM',
      shortName: 'KCN Hiệp Phước',
      companyNameEn: 'Hiep Phuoc Industrial Park Joint Stock Company'
    },
    {
      code: 'PNT',
      companyName: 'Công ty Cổ phần Kỹ thuật Xây dựng Phú Nhuận',
      exchange: 'UPCOM',
      shortName: 'KT XD Phú Nhuận',
      companyNameEn: 'Phu Nhuan Technical Construction Joint Stock Company'
    },
    {
      code: 'CMK',
      companyName: 'Công ty Cổ phần cơ khí Mạo Khê - Vinacomin ',
      exchange: 'UPCOM',
      shortName: 'Cơ khí Mạo Khê',
      companyNameEn: 'Viancom - Maokhe Mechanical Joint Stock Company'
    },
    {
      code: 'BAL',
      companyName: 'Công ty Cổ phần Bao bì Bia - Rượu - Nước giải khát',
      exchange: 'UPCOM',
      shortName: 'Bao bì nc giải khát',
      companyNameEn: 'Beer – Alcohol – Beverage Packaging Joint Stock Company'
    },
    {
      code: 'BTD',
      companyName: 'Công ty cổ phần Bê tông Ly tâm Thủ Đức',
      exchange: 'UPCOM',
      shortName: 'Bê tông Thủ Đức',
      companyNameEn: 'Thu Duc Centrifugal Concrete Joint Stock Company'
    },
    {
      code: 'CDG',
      companyName: 'Công ty cổ phần Cầu Đuống',
      exchange: 'UPCOM',
      shortName: 'CTCP Cầu Đuống',
      companyNameEn: 'CauDuong Joint Stock Company'
    },
    {
      code: 'CLM',
      companyName: 'Công ty cổ phần Xuất nhập khẩu Than - Vinacomin',
      exchange: 'HNX',
      shortName: 'XNK Than Vinacomin',
      companyNameEn: 'VINACOMIN - COAL IMPORT EXPORT  JOINT STOCK COMPANY'
    },
    {
      code: 'SGR',
      companyName: 'Công ty Cổ phần Địa ốc Sài Gòn',
      exchange: 'HOSE',
      shortName: 'Địa ốc Sài Gòn',
      companyNameEn: 'Saigon Real – Estate Joint Stock Company'
    },
    {
      code: 'DC1',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Xây dựng số 1',
      exchange: 'UPCOM',
      shortName: 'ĐTPT Xây dựng 1',
      companyNameEn: 'Development Investment Construction Number 1 Joint Stock Company'
    },
    {
      code: 'DHD',
      companyName: 'Công ty Cổ phần Dược Vật tư Y tế Hải Dương',
      exchange: 'UPCOM',
      shortName: 'V.tư Y tế Hải Dg',
      companyNameEn: 'Haiduong Pharmaceutical Medical Material Joint stock company'
    },
    {
      code: 'DOP',
      companyName: 'Công ty Cổ phần Vận tải Xăng dầu Đồng Tháp ',
      exchange: 'UPCOM',
      shortName: 'V.tải X.dầu Đ.Tháp',
      companyNameEn: 'Dongthap Petroleum Transportations Joint Stock Company'
    },
    {
      code: 'DSG',
      companyName: 'Công ty Cổ phần Kính Viglacera Đáp Cầu',
      exchange: 'UPCOM',
      shortName: 'Viglacera Đáp Cầu',
      companyNameEn: 'Viglacera Dapcau Sheet Glass Joint Stock Company'
    },
    {
      code: 'EAD',
      companyName: 'Công ty cổ phần Thủy điện Điện lực Đắk Lắk',
      exchange: 'UPCOM',
      shortName: 'Th.điện Đắk Lắk',
      companyNameEn: 'DAK LAK POWER HYDROELECTRIC JOINT STOCK COMPANY'
    },
    {
      code: 'HBH',
      companyName: 'Công ty Cổ phần Habeco - Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Habeco Hải Phòng',
      companyNameEn: 'Habeco - Hai Phong Joint Stock Company'
    },
    {
      code: 'HMS',
      companyName: 'Công ty cổ phần Xây dựng bảo tàng Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'XD bảo tàng HCM',
      companyNameEn: 'Hochiminh Museum Construction Joint Stock Company'
    },
    {
      code: 'HU6',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Nhà và Đô thị HUD6',
      exchange: 'UPCOM',
      shortName: 'Nhà & Đô thị HUD6',
      companyNameEn: 'HUD6 city and housing development investment joint stock company'
    },
    {
      code: 'KCB',
      companyName: 'Công ty Cổ phần Khoáng Sản Luyện Kim Cao Bằng',
      exchange: 'UPCOM',
      shortName: 'Luyện kim Cao Bằng',
      companyNameEn: 'Cao Bang Mineral and Metallurgical Joint Stock Company'
    },
    {
      code: 'KHD',
      companyName: 'Công ty cổ phần khai thác, chế biến khoáng sản Hải Dương',
      exchange: 'UPCOM',
      shortName: 'K.sản Hải Dương',
      companyNameEn: 'Hai Duong Mineral Eineal Processing Joint Stock Company'
    },
    {
      code: 'KLM',
      companyName: 'CÔNG TY CỔ PHẦN KIM LOẠI MÀU NGHỆ TĨNH',
      exchange: 'UPCOM',
      shortName: 'KIM LOẠI MÀU NGHỆ TĨNH',
      companyNameEn: 'NGHE TINH NON - FEROUS METAL JOINT STOCK COMPANY'
    },
    {
      code: 'MVY',
      companyName: 'Công ty Cổ phần Môi trường và Dịch vụ Đô thị Vĩnh Yên',
      exchange: 'UPCOM',
      shortName: 'Đô thị Vĩnh Yên',
      companyNameEn: 'Vinh Yen Environment and Urban Services Joint Stock Company'
    },
    {
      code: 'NAC',
      companyName: 'Công ty cổ phần Tư vấn Xây dựng Tổng hợp',
      exchange: 'UPCOM',
      shortName: 'T.vấn XD Tổng hợp',
      companyNameEn: 'National Of General Construction Consultants Joint Stock Company'
    },
    {
      code: 'PBC',
      companyName: 'Công ty cổ phần Dược phẩm Trung Ương I - Pharbaco',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm TW 1',
      companyNameEn: 'PHARBACO Central Pharmaceutical Joint Stock Company No1'
    },
    {
      code: 'PSW',
      companyName: 'Công ty Cổ phần Phân bón và Hóa chất dầu khí Tây Nam Bộ',
      exchange: 'HNX',
      shortName: 'Phân bón H.chất D.khí Tây Nam Bộ',
      companyNameEn: 'South-West Petrovietnam Fertilizer and Chemicals Joint Stock COmpany'
    },
    {
      code: 'PTE',
      companyName: 'Công ty Cổ phần Xi măng Phú Thọ',
      exchange: 'UPCOM',
      shortName: 'Xi măng Phú Thọ',
      companyNameEn: 'PHU THO CEMENT JOINT STOCK COMPANY'
    },
    {
      code: 'AMD',
      companyName: 'Công ty cổ phần đầu tư và khoáng sản FLC Stone',
      exchange: 'HOSE',
      shortName: 'Đầu tư K.sản FLC',
      companyNameEn: 'FLC STONE MINING AND INVESTMENT JOINT STOCK COMPANY'
    },
    {
      code: 'SIV',
      companyName: 'Công ty Cổ phần SIVICO',
      exchange: 'UPCOM',
      shortName: 'CTCP SIVICO',
      companyNameEn: 'SIVICO Joint stock company'
    },
    {
      code: 'BII',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển Công nghiệp Bảo Thư ',
      exchange: 'HNX',
      shortName: 'C.nghiệp Bảo Thư',
      companyNameEn: 'Bao Thu Industrial Development and Investment Joint Stock Company'
    },
    {
      code: 'GTN',
      companyName: 'Công ty cổ phần GTNFOODS',
      exchange: 'HOSE',
      shortName: 'GTN FOODS',
      companyNameEn: 'GTNFOODS Joint Stock Company'
    },
    {
      code: 'VNY',
      companyName: 'Công ty cổ phần Thuốc Thú y Trung Ương I',
      exchange: 'UPCOM',
      shortName: 'Thuốc Thú Y TW I',
      companyNameEn: 'Vietnam Veterinary Products Joint Stock Company'
    },
    {
      code: 'VLC',
      companyName: 'Tổng Công ty Chăn nuôi Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'TCT Chăn nuôi VN',
      companyNameEn: 'Vietnam Livestock Corporation Joint Stock Company'
    },
    {
      code: 'VCP',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Phát triển Năng lượng Vinaconex',
      exchange: 'UPCOM',
      shortName: 'N.lượng Vinaconex',
      companyNameEn: 'Vinaconex Power Development and Construction Investment Joint Stock Company'
    },
    {
      code: 'TEC',
      companyName: 'Công ty Cổ phần Traenco',
      exchange: 'UPCOM',
      shortName: 'CTCP Traenco',
      companyNameEn: 'Traenco Joint Stock Company'
    },
    {
      code: 'TQN',
      companyName: 'Công ty Cổ phần Thông Quảng Ninh',
      exchange: 'UPCOM',
      shortName: 'Thông Quảng Ninh',
      companyNameEn: 'Quang Ninh Pine Joint Stock Company'
    },
    {
      code: 'TVM',
      companyName: 'Công ty cổ phần Tư vấn Đầu tư Mỏ và Công nghiệp - Vinacomin',
      exchange: 'UPCOM',
      shortName: 'Đ.tư Mỏ Vinacomin',
      companyNameEn: 'Vinacomin Industry Investment Consulting Joint stock Company'
    },
    {
      code: 'VTH',
      companyName: 'Công ty Cổ phần Dây Cáp Điện Việt Thái',
      exchange: 'HNX',
      shortName: 'Cáp Điện Việt Thái',
      companyNameEn: 'VIET THAI ELECTRIC CABLE CORPORATION'
    },
    {
      code: 'PVH',
      companyName: 'Công ty Cổ phần Xây lắp Dầu khí Thanh Hóa',
      exchange: 'UPCOM',
      shortName: 'X.lắp D.khí Th.Hóa',
      companyNameEn: 'Thanh Hoa Petroleum Constraction Joint stock company'
    },
    {
      code: 'AVC',
      companyName: 'Công ty cổ phần Thủy điện A Vương',
      exchange: 'UPCOM',
      shortName: 'Th.điện A Vương',
      companyNameEn: 'A Vương Hydropower Joint Stock Company'
    },
    {
      code: 'EIN',
      companyName: 'Công ty cổ phần Đầu tư - Thương mại - Dịch vụ Điện lực',
      exchange: 'UPCOM',
      shortName: 'Dịch vụ Điện lực',
      companyNameEn: 'Electricity Investment Service Trade Joint Stock Company'
    },
    {
      code: 'PEQ',
      companyName: 'Công ty Cổ phần Thiết bị xăng dầu Petrolimex',
      exchange: 'UPCOM',
      shortName: 'T.bị Petrolimex',
      companyNameEn: 'PETROLIMEX EQUIPMENT JOINT STOCK COMPANY'
    },
    {
      code: 'HES',
      companyName: 'Công ty cổ phần Dịch vụ Giải trí Hà Nội',
      exchange: 'UPCOM',
      shortName: 'DV Giải trí Hà Nội',
      companyNameEn: 'Hanoi Entertainment Services Corporation'
    },
    {
      code: 'XPH',
      companyName: 'Công ty Cổ phần Xà phòng Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Xà phòng Hà Nội',
      companyNameEn: 'Hanoi Soap Joint Stock Company'
    },
    {
      code: 'TVC',
      companyName: 'Công ty cổ phần Tập đoàn Quản lý Tài sản Trí Việt',
      exchange: 'HNX',
      shortName: 'Tài sản Trí Việt',
      companyNameEn: 'Tri Viet Asset Management Corporation Joint Stock Company'
    },
    {
      code: 'PVP',
      companyName: 'Công ty cổ phần Vận tải Dầu khí Thái Bình Dương',
      exchange: 'UPCOM',
      shortName: 'V.tải D.khí TBD',
      companyNameEn: 'Pacific Petroleum Transportation Joint Stock Company'
    },
    {
      code: 'VVN',
      companyName: 'Tổng Công ty Cổ phần Xây dựng Công nghiệp Việt Nam',
      exchange: 'UPCOM',
      shortName: 'TCT XD C.nghiệp VN',
      companyNameEn: 'Viet Nam Industrial Construction Corporation'
    },
    {
      code: 'PEN',
      companyName: 'Công ty Cổ phần Xây lắp III Petrolimex',
      exchange: 'HNX',
      shortName: 'X.lắp 3 Petrolimex',
      companyNameEn: 'PETROLLIMEX INSTALLATION No.III JOINT STOCK COMPANY'
    },
    {
      code: 'CEO',
      companyName: 'Công ty Cổ phần Tập Đoàn C.E.O',
      exchange: 'HNX',
      shortName: 'Tập đoàn C.E.O',
      companyNameEn: 'C.E.O Group Joint Stock Company'
    },
    {
      code: 'DAS',
      companyName: 'Công ty Cổ phần Máy - Thiết bị Dầu khí Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'T.bị D.khí Đ.Nẵng',
      companyNameEn: 'Danang Petroleum Machinery - Technology Joint stock company'
    },
    {
      code: 'PVM',
      companyName: 'Công ty cổ phần Máy - Thiết bị Dầu khí',
      exchange: 'UPCOM',
      shortName: 'Thiết bị Dầu khí',
      companyNameEn: 'Petrovietnam Machinery–Technology Joint Stock Company'
    },
    {
      code: 'TBD',
      companyName: 'Tổng Công ty Thiết bị điện Đông Anh',
      exchange: 'UPCOM',
      shortName: 'T.bị điện Đông Anh',
      companyNameEn: 'DONG ANH ELECTRICAL EQUIPMENT MANUFACTURING JOINT STOCK COMPANY'
    },
    {
      code: 'ASD',
      companyName: 'Công ty Cổ phần Sông Đà Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Sông Đà Hà Nội',
      companyNameEn: 'Song Da Ha Noi Joint Stock Company'
    },
    {
      code: 'QBS',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Quảng Bình',
      exchange: 'HOSE',
      shortName: 'XNK Quảng Bình',
      companyNameEn: 'Quang Binh Import and Export JSC'
    },
    {
      code: 'NCT',
      companyName: 'Công ty Cổ phần dịch vụ hàng hóa Nội Bài ',
      exchange: 'HOSE',
      shortName: 'Hàng hóa Nội Bài',
      companyNameEn: 'Noibai Cargo Terminal services JSC'
    },
    {
      code: 'MH3',
      companyName: 'Công ty cổ phần Khu công nghiệp Cao su Bình Long',
      exchange: 'UPCOM',
      shortName: 'Cao su Bình Long',
      companyNameEn: 'Binh Long Rubber Industrial Park Corporation'
    },
    {
      code: 'VTJ',
      companyName: 'Công ty Cổ phần Thương mại và Đầu tư VI NA TA BA',
      exchange: 'HNX',
      shortName: 'Đầu tư Vinataba',
      companyNameEn: 'VI NA TA BA Trading And Investment Joint Stock Company'
    },
    {
      code: 'TVS',
      companyName: 'Công ty Cổ phần Chứng Khoán Thiên Việt',
      exchange: 'HOSE',
      shortName: 'CK Thiên Việt',
      companyNameEn: 'THIEN VIET SECURITIES JOINT STOCK COMPANY'
    },
    {
      code: 'NMK',
      companyName: 'Công ty Cổ phần Xây dựng Công trình 510',
      exchange: 'UPCOM',
      shortName: 'XD Công trình 510',
      companyNameEn: 'Civil Engineering Construction Joint - Stock Company No.510'
    },
    {
      code: 'SGO',
      companyName: 'Công ty Cổ phần Dầu thực vật Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Dầu thực vật SG',
      companyNameEn: 'Saigon Vegetable Oil Joint Stock Company'
    },
    {
      code: 'DAT',
      companyName: 'Công ty cổ phần Đầu tư Du lịch và Phát triển Thuỷ sản',
      exchange: 'HOSE',
      shortName: 'P.triển Thủy sản',
      companyNameEn: 'Travel Investment and Seafood Development Corporation'
    },
    {
      code: 'BSP',
      companyName: 'Công ty Cổ phần Bia Sài Gòn - Phú Thọ',
      exchange: 'UPCOM',
      shortName: 'Bia SG Phú Thọ',
      companyNameEn: 'Sai Gon – Phu Tho Beer Joint Stock Company'
    },
    {
      code: 'PBP',
      companyName: 'Công ty Cổ phần Bao Bì Dầu Khí Việt Nam',
      exchange: 'HNX',
      shortName: 'Bao Bì D.khí VN',
      companyNameEn: 'Petrovietnam Packing Joint Stock Company'
    },
    {
      code: 'TTB',
      companyName: 'Công ty Cổ phần Tập đoàn Tiến Bộ',
      exchange: 'HOSE',
      shortName: 'Tâp đoàn Tiến Bộ',
      companyNameEn: 'Tien Bo Joint Stock Company'
    },
    {
      code: 'HAH',
      companyName: 'Công ty Cổ phần Vận tải và xếp dỡ Hải An ',
      exchange: 'HOSE',
      shortName: 'Vận tải Hải An',
      companyNameEn: 'Hai An Transport And Stevedoring Joint Stock Company'
    },
    {
      code: 'DCM',
      companyName: 'Công ty Cổ phần Phân Bón Dầu khí Cà Mau',
      exchange: 'HOSE',
      shortName: 'Đạm Cà Mau',
      companyNameEn: 'PETROVIETNAM CAMAU FERTILIZER JOINT STOCK COMPANY'
    },
    {
      code: 'NTC',
      companyName: 'Công ty cổ phần Khu Công nghiệp Nam Tân Uyên',
      exchange: 'UPCOM',
      shortName: 'KCN Nam Tân Uyên',
      companyNameEn: 'Nam Tan Uyen Joint Stock Corporation'
    },
    {
      code: 'G20',
      companyName: 'Công ty Cổ phần Đầu tư Dệt may Vĩnh Phúc',
      exchange: 'UPCOM',
      shortName: 'May Vĩnh Phúc',
      companyNameEn: 'Vinh Phuc Textile Investment Joint Stock Company'
    },
    {
      code: 'NNG',
      companyName: 'Công ty Cổ phần công nghiệp- dịch vụ- thương mại Ngọc Nghĩa',
      exchange: 'UPCOM',
      shortName: 'T.mại Ngọc Nghĩa',
      companyNameEn: 'Ngoc Nghia Industry - Service - Trading Joint Stock Company'
    },
    {
      code: 'CDO',
      companyName: 'Công ty Cổ phần Tư vấn thiết kế và phát triển đô thị',
      exchange: 'UPCOM',
      shortName: 'T.kế P.triển Đ.thị',
      companyNameEn: 'Consultancy Design And Urban Development Joint Stock Company'
    },
    {
      code: 'NHP',
      companyName: 'Công ty Cổ phần sản xuất xuất nhập khẩu NHP',
      exchange: 'HNX',
      shortName: 'Sản xuất XNK NHP',
      companyNameEn: 'NHP  PRODUCTION  IMPORT – EXPORT JOINT STOCK COMPANY'
    },
    {
      code: 'MPT',
      companyName: 'Công ty Cổ phần Tập đoàn Trường Tiền',
      exchange: 'HNX',
      shortName: 'Tập đoàn Trường Tiền',
      companyNameEn: 'Truong Tien Group Joint Stock Company'
    },
    {
      code: 'CSV',
      companyName: 'Công ty Cổ phần hóa chất cơ bản Miền Nam ',
      exchange: 'HOSE',
      shortName: 'Hóa chất Miền Nam',
      companyNameEn: 'SOUTH BASIC CHEMICALS JOINT STOCK COMPANY'
    },
    {
      code: 'APF',
      companyName: 'Công ty Cổ phần Nông sản Thực phẩm Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'N.sản Quảng Ngãi',
      companyNameEn: 'Quang Ngai Agricultural Products and Foodstuff Joint Stock Company'
    },
    {
      code: 'KVC',
      companyName: 'Công ty Cổ phần sản xuất xuất nhập khẩu INOX Kim vĩ',
      exchange: 'HNX',
      shortName: 'SX XNK INOX Kim vĩ',
      companyNameEn: 'Kim Vi Inox Import Export Production Joint Stock Company'
    },
    {
      code: 'ACV',
      companyName: 'Tổng công ty cảng hàng không Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'Cảng Hàng không VN',
      companyNameEn: 'Airports Corporation of Vietnam'
    },
    {
      code: 'HKB',
      companyName: 'Công ty Cổ phần nông nghiệp và thực phẩm Hà Nội - Kinh Bắc ',
      exchange: 'HNX',
      shortName: 'Th.phẩm Kinh Bắc',
      companyNameEn: 'Hanoi - Kinhbac Agriculture And Food Joint Stock Company'
    },
    {
      code: 'XMD',
      companyName: 'Công ty Cổ phần Xuân Mai - Đạo Tú',
      exchange: 'UPCOM',
      shortName: 'Xuân Mai - Đạo Tú',
      companyNameEn: 'Xuan Mai Dao Tu Joint Stock Company'
    },
    {
      code: 'VTK',
      companyName: 'Công ty cổ phần Tư vấn Thiết kế Viettel',
      exchange: 'UPCOM',
      shortName: 'Tư vấn T.kế Viettel',
      companyNameEn: 'Viettel Consultant and Design Joint Stock Company'
    },
    {
      code: 'SHG',
      companyName: 'Tổng Công ty Cổ phần Sông Hồng',
      exchange: 'UPCOM',
      shortName: 'TCTCP Sông Hồng',
      companyNameEn: 'Songhong Joint Stock Corporation'
    },
    {
      code: 'GSM',
      companyName: 'Công ty Cổ phần Thủy điện Hương Sơn',
      exchange: 'UPCOM',
      shortName: 'Th.điện Hương Sơn',
      companyNameEn: 'Huong Son Hydro Power Joint Stock Company'
    },
    {
      code: 'MTM',
      companyName: 'Công ty cổ phần Mỏ và Xuất nhập khẩu Khoáng sản Miền Trung',
      exchange: 'UPCOM',
      shortName: 'XNK K.sản M.Trung',
      companyNameEn: 'Central Mining and Mineral Import Export Joint Stock Company'
    },
    {
      code: 'SMN',
      companyName: 'Công ty Cổ phần sách và thiết bị giáo dục miền Nam ',
      exchange: 'HNX',
      shortName: 'Sách T.bị M.Nam',
      companyNameEn: 'SOUTH BOOKS & EDUCATIONAL EQUIPMENT JOINT STOCK COMPANY'
    },
    {
      code: 'DPS',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Sóc Sơn',
      exchange: 'HNX',
      shortName: 'ĐTPT Sóc Sơn',
      companyNameEn: 'SOC SON DEVELOPMENT INVESMENT JOIN STOCK COMPANY'
    },
    {
      code: 'CKD',
      companyName: 'Công ty Cổ phần cơ khí Đông Anh Licogi',
      exchange: 'UPCOM',
      shortName: 'Cơ khí Đông Anh',
      companyNameEn: 'Dong Anh Licogi Mechanical Joint Stock Company'
    },
    {
      code: 'FID',
      companyName: 'Công ty Cổ phần đầu tư và phát triển doanh nghiệp Việt Nam ',
      exchange: 'HNX',
      shortName: 'ĐTPT D.nghiệp VN',
      companyNameEn: 'VIETNAM  ENTERPRISE  INVESTMENT  AND DEVELOPMENT JOINT STOCK COMPANY'
    },
    {
      code: 'DDV',
      companyName: 'Công ty Cổ phần DAP - VINACHEM',
      exchange: 'UPCOM',
      shortName: 'DAP - VINACHEM',
      companyNameEn: 'DAP - VINACHEM Joint Stock Company'
    },
    {
      code: 'HPD',
      companyName: 'Công ty Cổ phần thủy điện Đăk Đoa',
      exchange: 'UPCOM',
      shortName: 'Th.điện Đăk Đoa',
      companyNameEn: 'Dak Doa Hydropower Joint Stock Company'
    },
    {
      code: 'HIZ',
      companyName: 'Công ty cổ phần Khu công nghiệp Hố Nai',
      exchange: 'UPCOM',
      shortName: 'KCN Hố Nai',
      companyNameEn: 'HONAI Industrial Zone Joint Stock Company'
    },
    {
      code: 'MFS',
      companyName: 'Công ty cổ phần Dịch vụ kỹ thuật Mobifone',
      exchange: 'UPCOM',
      shortName: 'DV K.thuật Mobifone',
      companyNameEn: 'Mobifone Service JSC'
    },
    {
      code: 'HKP',
      companyName: 'CÔNG TY CỔ PHẦN BAO BÌ HÀ TIÊN',
      exchange: 'UPCOM',
      shortName: 'BAO BÌ HÀ TIÊN',
      companyNameEn: 'HA TIEN PACKAGING JOINT STOCK COMPANY'
    },
    {
      code: 'BCP',
      companyName: 'Công ty cổ phần dược ENLIE',
      exchange: 'UPCOM',
      shortName: 'Dược Becamex',
      companyNameEn: 'ENLIE PHARMACEUTICAL JOINT STOCK COMPANY'
    },
    {
      code: 'BRS',
      companyName: 'Công ty Cổ phần Dịch vụ Đô thị Bà Rịa',
      exchange: 'UPCOM',
      shortName: 'DV Đô thị Bà Rịa',
      companyNameEn: 'Ba Ria Urban Service Joint Stock Company'
    },
    {
      code: 'UPC',
      companyName: 'Công ty cổ phần Phát triển công viên cây xanh và Đô thị Vũng Tàu',
      exchange: 'UPCOM',
      shortName: 'Cây xanh Vũng Tàu',
      companyNameEn: 'Vung Tau Urban And Parks Development Joint Stock Company'
    },
    {
      code: 'CKH',
      companyName: 'Công ty Cổ Phần Cơ Khí Chế tạo Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Cơ khí Hải Phòng',
      companyNameEn: 'Haiphong Machinery Manufacturing Joint Stock Company'
    },
    {
      code: 'TW3',
      companyName: 'Công ty Cổ phần Dược Trung Ương 3',
      exchange: 'UPCOM',
      shortName: 'Dược Trung ương 3',
      companyNameEn: 'Central Pharmaceutical Joint Stock Company No.3'
    },
    {
      code: 'PHP',
      companyName: 'Công ty Cổ phần Cảng Hải Phòng',
      exchange: 'HNX',
      shortName: 'Cảng Hải Phòng',
      companyNameEn: 'Port of Hai Phong Joint Stock Company'
    },
    {
      code: 'HVA',
      companyName: 'Công ty Cổ phần Đầu tư HVA',
      exchange: 'UPCOM',
      shortName: 'Đầu tư HVA',
      companyNameEn: 'HVA Investment Joint Stock Company'
    },
    {
      code: 'ACM',
      companyName: 'Công ty Cổ phần Tập đoàn khoáng sản Á Cường',
      exchange: 'HNX',
      shortName: 'K.sản Á Cường',
      companyNameEn: 'A  CUONG  MINERAL  GROUP JOINT  STOCK COMPANY'
    },
    {
      code: 'TOP',
      companyName: 'Công ty Cổ phần Phân phối Top One',
      exchange: 'UPCOM',
      shortName: 'Phân phối Top One',
      companyNameEn: 'Top One Allot joint stock company'
    },
    {
      code: 'VMA',
      companyName: 'Công ty Cổ phần Công nghiệp Ô tô - Vinacomin',
      exchange: 'UPCOM',
      shortName: 'CN Ô tô Vinacomin',
      companyNameEn: 'Vinacomin Motor Industry Joint Stock Company'
    },
    {
      code: 'LAI',
      companyName: 'Công ty Cổ phần Đầu tư xây dựng Long An IDICO ',
      exchange: 'UPCOM',
      shortName: 'Long An IDICO',
      companyNameEn: 'IDICO Long An Investment Construction JSC'
    },
    {
      code: 'TA9',
      companyName: 'Công ty Cổ phần Xây lắp Thành An 96',
      exchange: 'HNX',
      shortName: 'X.lắp Thành An 96',
      companyNameEn: 'Thanh An 96 Installation and Construction Joint Stock Company'
    },
    {
      code: 'DGW',
      companyName: 'Công ty Cổ phần Thế giới Số',
      exchange: 'HOSE',
      shortName: 'CTCP Thế giới Số',
      companyNameEn: 'DIGIWORLD CORP'
    },
    {
      code: 'C71',
      companyName: 'Công ty Cổ phần 471',
      exchange: 'UPCOM',
      shortName: 'CTCP 471',
      companyNameEn: 'Joint Stock Company 471'
    },
    {
      code: 'AGX',
      companyName: 'Công ty Cổ phần nông sản xuất khẩu Sài Gòn ',
      exchange: 'UPCOM',
      shortName: 'Nông SX khẩu SG',
      companyNameEn: 'SAIGON EXPORT FOODSTUFFS ANDAGRICULTURAL PRODUCTS JOINT STOCK COMPANY'
    },
    {
      code: 'LDG',
      companyName: 'Công ty Cổ phần Đầu tư LDG ',
      exchange: 'HOSE',
      shortName: 'CTCP Đầu tư LDG',
      companyNameEn: 'LDG Investment Joint Stock Company'
    },
    {
      code: 'PVO',
      companyName: 'Công ty Cổ phần DẦU NHỜN PV OIL',
      exchange: 'UPCOM',
      shortName: 'Dầu nhờn PV OIL',
      companyNameEn: 'PV OIL LUBE JOINT STOCK COMPANY'
    },
    {
      code: 'MCI',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Phát triển Vật liệu IDICO',
      exchange: 'UPCOM',
      shortName: 'Vật liệu IDICO',
      companyNameEn: 'IDICO Material development and construction investment Joint Stock Company'
    },
    {
      code: 'PMP',
      companyName: 'Công ty Cổ phần Bao bì Đạm Phú Mỹ',
      exchange: 'HNX',
      shortName: 'Bao bì Đạm Phú Mỹ',
      companyNameEn: 'DAM PHU MY PACKAGING JOINT STOCK COMPANY'
    },
    {
      code: 'BFC',
      companyName: 'Công ty Cổ phần Phân bón Bình Điền ',
      exchange: 'HOSE',
      shortName: 'Phân bón Bình Điền',
      companyNameEn: 'Binh Dien Fertilizer Joint Stoxk Company'
    },
    {
      code: 'SDX',
      companyName: 'Công ty Cổ phần phòng cháy chữa cháy và đầu tư xây dựng Sông Đà',
      exchange: 'UPCOM',
      shortName: 'PCCC & XD Sông Đà',
      companyNameEn: 'Song Da Investment Construction And Fire Prevention Joint stock company'
    },
    {
      code: 'VLG',
      companyName: 'Công ty Cổ phần Vinalines Logistics - Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Vinalines Logistics',
      companyNameEn: 'Vinalines Logistics - Viet Nam Joint Stock Company'
    },
    {
      code: 'CCR',
      companyName: 'Công ty Cổ phần Cảng Cam Ranh ',
      exchange: 'UPCOM',
      shortName: 'Cảng Cam Ranh',
      companyNameEn: 'CAM RANH PORT JOINT STOCK COMPANY'
    },
    {
      code: 'TRS',
      companyName: 'Công ty Cổ phần Vận tải và Dịch vụ Hàng hải',
      exchange: 'UPCOM',
      shortName: 'V.tải Hàng hải',
      companyNameEn: 'TRACIMEXCO - SUPPLY  CHAINS  AND  AGENCY  SERVICES J.S COMPANY'
    },
    {
      code: 'MSR',
      companyName: 'CÔNG TY CỔ PHẦN MASAN HIGH-TECH MATERIALS',
      exchange: 'UPCOM',
      shortName: 'MASAN HIGH-TECH MATERIALS',
      companyNameEn: 'MASAN HIGH-TECH MATERIALS CORPORATION'
    },
    {
      code: 'AGP',
      companyName: 'Công ty Cổ phần Dược phẩm Agimexpharm',
      exchange: 'UPCOM',
      shortName: 'Dược Agimexpharm',
      companyNameEn: 'AGIMEXPHARM PHARMACEUTICAL JOINT STOCK COMPANY'
    },
    {
      code: 'BDW',
      companyName: 'Công ty Cổ phần Cấp thoát nước Bình Định ',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc B.Định',
      companyNameEn: 'BINHDINH Water Supply and Sewerage Joint Stock Company'
    },
    {
      code: 'PMB',
      companyName: 'Công ty Cổ phần Phân bón và Hóa chất Dầu khí miền Bắc ',
      exchange: 'HNX',
      shortName: 'H.chất DK M.Bắc',
      companyNameEn: 'North PetroVietnam Fertilizer & Chemicals Joint Stock Company'
    },
    {
      code: 'NAF',
      companyName: 'Công ty Cổ phần Nafoods Group ',
      exchange: 'HOSE',
      shortName: 'CTCP Nafoods Group',
      companyNameEn: 'Nafoods Group Joint Stock Company'
    },
    {
      code: 'NAP',
      companyName: 'Công ty Cổ phần Cảng Nghệ Tĩnh',
      exchange: 'HNX',
      shortName: 'Cảng Nghệ Tĩnh',
      companyNameEn: 'Nghetinh Port Joint Stock Company'
    },
    {
      code: 'HNF',
      companyName: 'Công ty Cổ phần Thực phẩm Hữu Nghị ',
      exchange: 'UPCOM',
      shortName: 'Th.phẩm Hữu Nghị',
      companyNameEn: 'HuuNghi Food Joint Stock Company'
    },
    {
      code: 'MBG',
      companyName: 'Công ty cổ phần Tập đoàn MBG',
      exchange: 'HNX',
      shortName: 'ĐTPT XD T.mại VN',
      companyNameEn: 'MBG Group Joint Stock Company'
    },
    {
      code: 'VTM',
      companyName: 'Công ty cổ phần Vận Tải và đưa đón thợ mỏ - Vinacomin',
      exchange: 'UPCOM',
      shortName: 'V.tải thợ mỏ',
      companyNameEn: 'Vinacomin- Transportation and Miner Commuting Service'
    },
    {
      code: 'NDP',
      companyName: 'Công ty cổ phần Dược phẩm 2/9',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm 2/9',
      companyNameEn: 'National Day Pharmaceutical Joint Stock Company'
    },
    {
      code: 'PCN',
      companyName: 'Công ty cổ phần Hóa phẩm Dầu khí DMC - Miền Bắc',
      exchange: 'UPCOM',
      shortName: 'DMC Miền Bắc',
      companyNameEn: 'DMC-Northern Petrolium Chemicals Joint Stock Company'
    },
    {
      code: 'SGN',
      companyName: 'Công ty cổ phần Phục vụ Mặt đất Sài Gòn',
      exchange: 'HOSE',
      shortName: 'Phục vụ Mặt đất SG',
      companyNameEn: 'Saigon Ground Serv ices Joint Stock Company'
    },
    {
      code: 'HHV',
      companyName: 'Công ty Cổ phần Đầu tư hạ tầng giao thông Đèo Cả',
      exchange: 'UPCOM',
      shortName: 'Q.lý hầm Hải Vân',
      companyNameEn: 'Deo Ca Traffic Infrastructure Investment Joint Stock'
    },
    {
      code: 'VEF',
      companyName: 'Công ty cổ phần Trung Tâm Hội Chợ Triển Lãm Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Hội chợ triển lãm',
      companyNameEn: 'VietNam Exhibition Fair Centre Joint Stock Company'
    },
    {
      code: 'LAW',
      companyName: 'Công ty Cổ phần Cấp thoát nước Long An',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Long An',
      companyNameEn: 'LONG AN WATER SUPPLY SEWERAGE JOINT STOCK COMPANY'
    },
    {
      code: 'KSV',
      companyName: 'Tổng công ty Khoáng sản TKV - CTCP',
      exchange: 'UPCOM',
      shortName: 'Khoáng sản TKV',
      companyNameEn: 'Vinacomin - Minerals Holding Coporation'
    },
    {
      code: 'TEG',
      companyName: 'Công ty Cổ phần Năng lượng và Bất động sản Trường Thành',
      exchange: 'HOSE',
      shortName: 'Năng lượng và Bất động sản Trường Thành',
      companyNameEn: 'Truong Thanh Energy And Real Estate Joint Stock Company'
    },
    {
      code: 'PIS',
      companyName: 'Tổng công ty PISICO Bình Định - CTCP',
      exchange: 'UPCOM',
      shortName: 'PISICO Bình Định',
      companyNameEn: 'PISICO Binh Dinh Corporation — Joint Stock Company'
    },
    {
      code: 'HPM',
      companyName: 'Công ty Cổ phần Xây dựng Thương mại và Khoáng sản Hoàng Phúc',
      exchange: 'HNX',
      shortName: 'K.sản Hoàng Phúc',
      companyNameEn: 'HOANG PHUC Mineral Trading and Contruction Joint Stock Company'
    },
    {
      code: 'VPA',
      companyName: 'Công ty Cổ phần Vận tải Hóa dầu VP',
      exchange: 'UPCOM',
      shortName: 'V.tải Hóa dầu VP',
      companyNameEn: 'VP PETROCHEMICAL TRANSPORT JOINT STOCK COMPANY'
    },
    {
      code: 'DNW',
      companyName: 'Công ty Cổ phần Cấp nước Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Đồng Nai',
      companyNameEn: 'DONG NAI WATER JOINT STOCK COMPANY'
    },
    {
      code: 'PPY',
      companyName: 'Công ty Cổ phần Xăng dầu Dầu khí Phú Yên',
      exchange: 'HNX',
      shortName: 'Dầu khí Phú Yên',
      companyNameEn: 'PETROLVIETNAM OIL PHU YEN JOINT STOCK COMPANY'
    },
    {
      code: 'CMP',
      companyName: 'Công ty Cổ phần Cảng Chân Mây',
      exchange: 'UPCOM',
      shortName: 'Cảng Chân Mây',
      companyNameEn: 'Chan May Port Joint Stock Company'
    },
    {
      code: 'KPF',
      companyName: 'Công ty cổ phần Đầu tư tài chính Hoàng Minh',
      exchange: 'HOSE',
      shortName: 'T.chính Hoàng Minh',
      companyNameEn: 'Hoang Minh Finance Investment Joint stock company'
    },
    {
      code: 'SRT',
      companyName: 'Công ty cổ phần Vận tải Đường sắt Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'V.tải Đ.sắt SG',
      companyNameEn: 'Sai Gon Railway Transport Joint Stock Company'
    },
    {
      code: 'LQN',
      companyName: 'Công ty cổ phần LICOGI Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'LICOGI Quảng Ngãi',
      companyNameEn: 'LICOGI QUANG NGAI JOINT STOCK COMPANY'
    },
    {
      code: 'HND',
      companyName: 'Công ty Cổ phần Nhiệt điện Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Nh.điện H.Phòng',
      companyNameEn: 'Hai Phong Thermal Power Joint Stock Company'
    },
    {
      code: 'QTP',
      companyName: 'Công ty Cổ phần Nhiệt điện Quảng Ninh',
      exchange: 'UPCOM',
      shortName: 'Nh.điện Q.Ninh',
      companyNameEn: 'Quang Ninh Thermal Power Joint Stock Company'
    },
    {
      code: 'RBC',
      companyName: 'Công ty cổ phần Công nghiệp và Xuất nhập khẩu Cao su',
      exchange: 'UPCOM',
      shortName: 'CN & XNK Cao su',
      companyNameEn: 'Rubber Industry and Import - Export Joint Stock Company'
    },
    {
      code: 'CXH',
      companyName: 'Công ty cổ phần Xe khách Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Xe khách Hà Nội',
      companyNameEn: 'Hanoi Passenger Car Joint Stock Company'
    },
    {
      code: 'THW',
      companyName: 'Công ty cổ phần cấp nước Tân Hòa',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Tân Hòa',
      companyNameEn: 'Tan Hoa Water Supply Joint Stock Company'
    },
    {
      code: 'BTU',
      companyName: 'Công ty cổ phần Công trình Đô thị Bến Tre',
      exchange: 'UPCOM',
      shortName: 'Đô thị Bến Tre',
      companyNameEn: 'BENTRE URBAN PROJECT JOINT STOCK COMPANY'
    },
    {
      code: 'ATS',
      companyName: 'Công ty cổ phần Suất ăn công nghiệp Atesco',
      exchange: 'HNX',
      shortName: 'Suất ăn Atesco',
      companyNameEn: 'Atesco Industrial Catering Joint Stock Company'
    },
    {
      code: 'KDM',
      companyName: 'CÔNG TY CỔ PHẦN TỔNG CÔNG TY PHÁT TRIỂN KHU ĐÔ THỊ DÂN CƯ MỚI',
      exchange: 'HNX',
      shortName: 'TỔNG CÔNG TY KHU DÂN MỚI',
      companyNameEn: 'NEW RESIDENTIAL URBAN AREA DEVELOPMENT JOINT STOCK COMPANY'
    },
    {
      code: 'NWT',
      companyName: 'Công ty Cổ phần Vận tải Newway',
      exchange: 'UPCOM',
      shortName: 'Vận tải Newway',
      companyNameEn: 'Newway Transport Joint Stock Company'
    },
    {
      code: 'TDM',
      companyName: 'Công ty cổ phần Nước Thủ Dầu Một',
      exchange: 'HOSE',
      shortName: 'Nước Thủ Dầu Một',
      companyNameEn: 'Thu Dau Mot Water Joint Stock Company'
    },
    {
      code: 'TID',
      companyName: 'Công ty cổ phần Tổng công ty Tín Nghĩa',
      exchange: 'UPCOM',
      shortName: 'CTCP Tín Nghĩa',
      companyNameEn: 'Tin Nghia Corporation'
    },
    {
      code: 'VLW',
      companyName: 'Công ty cổ phần Cấp nước Vĩnh Long',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Vĩnh Long',
      companyNameEn: 'Vinh Long Water Supply Joint Stock Company'
    },
    {
      code: 'VIF',
      companyName: 'Tổng công ty Lâm nghiệp Việt Nam - Công ty cổ phần',
      exchange: 'HNX',
      shortName: 'TCT L.nghiệp VN',
      companyNameEn: 'Viet Nam Forestry Corporation Joint Stock Company'
    },
    {
      code: 'G36',
      companyName: 'Tổng công ty 36 - CTCP',
      exchange: 'UPCOM',
      shortName: 'Tổng công ty 36',
      companyNameEn: '36 Corporation'
    },
    {
      code: 'BMN',
      companyName: 'Công ty cổ phần 715',
      exchange: 'UPCOM',
      shortName: 'CTCP 715',
      companyNameEn: '715. Joint Stock Company'
    },
    {
      code: 'HPX',
      companyName: 'Công ty cổ phần Đầu tư Hải Phát',
      exchange: 'HOSE',
      shortName: 'Đầu tư Hải Phát',
      companyNameEn: 'Hai Phat Investment Joint Stock Company'
    },
    {
      code: 'I10',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng số 10 IDICO',
      exchange: 'UPCOM',
      shortName: 'Xây dựng 10 IDICO',
      companyNameEn: 'IDICO NO.10 INVESTMENT CONSTRUCTION JOINT STOCK COMPANY'
    },
    {
      code: 'SVG',
      companyName: 'Công ty cổ phần Hơi Kĩ Nghệ Que Hàn',
      exchange: 'UPCOM',
      shortName: 'Kĩ Nghệ Que Hàn',
      companyNameEn: 'INDUSTRIAL GAS AND WELDING ELECTRODE JOINT STOCK COMPANY'
    },
    {
      code: 'BDG',
      companyName: 'CÔNG TY CỔ PHẦN MAY MẶC BÌNH DƯƠNG',
      exchange: 'UPCOM',
      shortName: 'MAY MẶC BÌNH DƯƠNG',
      companyNameEn: 'Protrade Garment Joint Stock Company'
    },
    {
      code: 'TVW',
      companyName: 'Công ty cổ phần Cấp thoát nước Trà Vinh',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Tr.Vinh',
      companyNameEn: 'TraVinh Water Supply& Drainage Joint Stock Company'
    },
    {
      code: 'XLV',
      companyName: 'Công ty cổ phần Xây lắp và Dịch vụ Sông Đà',
      exchange: 'UPCOM',
      shortName: 'X.lắp DV Sông Đà',
      companyNameEn: 'Song Da Construction and Service Joint Stock Company'
    },
    {
      code: 'KIP',
      companyName: 'Công ty cổ phần K.I.P Việt Nam',
      exchange: 'UPCOM',
      shortName: 'K.I.P Việt Nam',
      companyNameEn: 'Vietnam K.I.P Joint Stock Company'
    },
    {
      code: 'VPD',
      companyName: 'Công ty Cổ phần Phát triển Điện Lực Việt Nam',
      exchange: 'HOSE',
      shortName: 'Điện Lực Việt Nam',
      companyNameEn: 'Viet Nam Power Development Joint Stock Company'
    },
    {
      code: 'BWE',
      companyName: 'Công ty Cổ phần Nước - Môi trường Bình Dương',
      exchange: 'HOSE',
      shortName: 'M.trường Bình Dg',
      companyNameEn: 'Binh Duong Water Environment Joint Stock Company'
    },
    {
      code: 'SGP',
      companyName: 'Công ty Cổ phần Cảng Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Cảng Sài Gòn',
      companyNameEn: 'Saigon Port Joint Stock Company'
    },
    {
      code: 'QSP',
      companyName: 'Công ty Cổ phần Tân Cảng Quy Nhơn',
      exchange: 'UPCOM',
      shortName: 'Tân Cảng Quy Nhơn',
      companyNameEn: 'QUY NHON NEW PORT JOINT STOCK COMPANY'
    },
    {
      code: 'PYU',
      companyName: 'Công ty cổ phần Môi trường và Công trình đô thị Phúc Yên',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị Ph.Yên',
      companyNameEn: 'Phuc Yen Environment and Urban Works Joints stock company'
    },
    {
      code: 'MST',
      companyName: 'Công ty cổ phần đầu tư MST',
      exchange: 'HNX',
      shortName: 'Đầu tư MST',
      companyNameEn: 'MST Investment Joint Stock Company'
    },
    {
      code: 'NTT',
      companyName: 'Công ty cổ phần Dệt - May Nha Trang',
      exchange: 'UPCOM',
      shortName: 'Dệt May Nha Trang',
      companyNameEn: 'Nha Trang Textile & Garment Joint Stock Company'
    },
    {
      code: 'TTL',
      companyName: 'Tổng công ty xây dựng Thăng Long - Công ty cổ phần',
      exchange: 'HNX',
      shortName: 'TCT Thăng Long',
      companyNameEn: 'Thang Long Joint Stock Corporation'
    },
    {
      code: 'TNI',
      companyName: 'Công ty cổ phần Tập đoàn Thành Nam',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Thành Nam',
      companyNameEn: 'Thanh Nam Group Joint stock company'
    },
    {
      code: 'VOC',
      companyName: 'Tổng Công ty Công nghiệp dầu thực vật Việt Nam – CTCP',
      exchange: 'UPCOM',
      shortName: 'Dầu thực vật VN',
      companyNameEn: 'Vietnam Vegetable Oils Industry Corporation - Join stock Company'
    },
    {
      code: 'MTL',
      companyName: 'Công ty Cổ phần Dịch vụ Môi trường Đô thị Từ Liêm',
      exchange: 'UPCOM',
      shortName: 'Đô thị Từ Liêm',
      companyNameEn: 'Tu Liem Urban Environment Service Joint Stock Company'
    },
    {
      code: 'FCC',
      companyName: 'Công ty Cổ phần Liên Hợp Thực Phẩm',
      exchange: 'UPCOM',
      shortName: 'Liên Hợp Thực Phẩm',
      companyNameEn: 'Foodstuff Combina Torial Joint Stock Company'
    },
    {
      code: 'ILS',
      companyName: 'Công ty cổ phần Đầu tư Thương mại và Dịch vụ Quốc tế',
      exchange: 'UPCOM',
      shortName: 'Dịch vụ Quốc tế',
      companyNameEn: 'International Investment Trade and Service Joint Stock Company'
    },
    {
      code: 'HD2',
      companyName: 'Công ty cổ phần Đầu tư Phát triển nhà HUD2',
      exchange: 'UPCOM',
      shortName: 'ĐTPT nhà HUD2',
      companyNameEn: 'Housing Development Investment Joint Stock Company HUD2'
    },
    {
      code: 'KGM',
      companyName: 'Công ty cổ phần Xuất nhập khẩu Kiên Giang',
      exchange: 'UPCOM',
      shortName: 'XNK Kiên GIang',
      companyNameEn: 'Kien Giang Import & Export Joint Stock Company'
    },
    {
      code: 'MVB',
      companyName: 'Tổng công ty Công nghiệp mỏ Việt Bắc TKV_CTCP',
      exchange: 'HNX',
      shortName: 'Mỏ Việt Bắc TKV',
      companyNameEn: 'Vinacomin- VietBac Mining Industry Holding Corporation'
    },
    {
      code: 'NSG',
      companyName: 'Công ty Cổ phần Nhựa Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'CTCP Nhựa Sài Gòn',
      companyNameEn: 'Sai Gon Plastic Joint Stock Company'
    },
    {
      code: 'VGV',
      companyName: 'Tổng Công ty Tư vấn Xây dựng Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'Tư vấn Xây dựng VN',
      companyNameEn: 'Vietnam National Construction Consultants Corporation - JSC'
    },
    {
      code: 'NCP',
      companyName: 'Công ty Cổ phần nhiệt điện Cẩm Phả - TKV',
      exchange: 'UPCOM',
      shortName: 'Nh.điện Cẩm Phả',
      companyNameEn: 'TKV - Cam Pha Thermal Power JointStock Company'
    },
    {
      code: 'HUX',
      companyName: 'Công ty cổ phần khoáng sản Thừa Thiên Huế',
      exchange: 'UPCOM',
      shortName: 'Khoáng sản Thừa Thiên Huế',
      companyNameEn: 'Thua Thien Hue minerals joint stock company'
    },
    {
      code: 'NBT',
      companyName: 'Công ty cổ phần cấp thoát nước Bến Tre',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Bến Tre',
      companyNameEn: 'Ben Tre water supply and sewerage joint stock company'
    },
    {
      code: 'MGC',
      companyName: 'Công ty cổ phần Địa chất mỏ - TKV',
      exchange: 'UPCOM',
      shortName: 'Địa chất mỏ - TKV',
      companyNameEn: 'Vinacomin – Mining Geology Joint Stock Company'
    },
    {
      code: 'DBH',
      companyName: 'Công ty cổ phần Đường bộ Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Đường bộ Hải Phòng',
      companyNameEn: 'HAIPHONG OVERLAND ROAD JOINT STOCK COMPANY'
    },
    {
      code: 'ATG',
      companyName: 'Công ty Cổ phần An Trường An',
      exchange: 'HOSE',
      shortName: 'An Trường An',
      companyNameEn: 'An Truong An Joint Stock Company'
    },
    {
      code: 'BIO',
      companyName: 'Công ty cổ phần Vắc Xin và Sinh phẩm Nha Trang',
      exchange: 'UPCOM',
      shortName: 'Sinh phẩm N.Trang',
      companyNameEn: 'Nha Trang Vaccines And Biological Products Joint-Stock Company'
    },
    {
      code: 'BSR',
      companyName: 'Công ty cổ phần Lọc – Hóa dầu Bình Sơn',
      exchange: 'UPCOM',
      shortName: 'Hóa dầu Bình Sơn',
      companyNameEn: 'Binh Son Refining and Petrochemical Joint Stock Company'
    },
    {
      code: 'CPH',
      companyName: 'Công ty cổ phần Phục vụ mai táng Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Mai táng Hải Phòng',
      companyNameEn: 'Haiphong Funeral Services Joint Stock Company'
    },
    {
      code: 'CTW',
      companyName: 'Công ty Cổ phần Cấp thoát nước Cần Thơ',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Cần Thơ',
      companyNameEn: 'Can Tho Water Supply - Sewerage Joint Stock Company'
    },
    {
      code: 'DFC',
      companyName: 'Công ty Cổ phần Xích Líp Đông Anh',
      exchange: 'UPCOM',
      shortName: 'Xích Líp Đông Anh',
      companyNameEn: 'Dong Anh C&F Joint Stock Company'
    },
    {
      code: 'FRT',
      companyName: 'Công ty cổ phần Bán lẻ Kỹ thuật số FPT',
      exchange: 'HOSE',
      shortName: 'Bán lẻ KTS FPT',
      companyNameEn: 'FPT Digital Retail Joint Stock Company'
    },
    {
      code: 'HNP',
      companyName: 'Công ty cổ phần Hanel Xốp nhựa',
      exchange: 'UPCOM',
      shortName: 'Hanel Xốp nhựa',
      companyNameEn: 'Hanel Plastics Joint Stock Company'
    },
    {
      code: 'HID',
      companyName: 'Công ty Cổ phần Halcom Việt Nam',
      exchange: 'HOSE',
      shortName: 'Halcom Việt Nam',
      companyNameEn: 'Halcom Vietnam Joint Stock Company'
    },
    {
      code: 'HPW',
      companyName: 'Công ty cổ phần Cấp nước Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Cấp nc H.Phòng',
      companyNameEn: 'Hai Phong water Joint stock company'
    },
    {
      code: 'NVL',
      companyName: 'Công ty cổ phần Tập đoàn Đầu tư Địa ốc No Va',
      exchange: 'HOSE',
      shortName: 'Địa ốc Novaland',
      companyNameEn: 'No Va Land Investment Group Corporation'
    },
    {
      code: 'PCC',
      companyName: 'Công ty cổ phần Tập đoàn Xây lắp 1 - Petrolimex',
      exchange: 'UPCOM',
      shortName: 'X.lắp 1 Petrolimex',
      companyNameEn: 'Petrolimex Construction 1 Joint Stock Company Group'
    },
    {
      code: 'BSG',
      companyName: 'Công ty cổ phần Xe khách Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Xe khách Sài Gòn',
      companyNameEn: 'Sai Gon Passenger Transport Joint Stock Company'
    },
    {
      code: 'SHX',
      companyName: 'Công ty cổ phần Sài Gòn Hỏa xa',
      exchange: 'UPCOM',
      shortName: 'Sài Gòn Hỏa xa',
      companyNameEn: 'SAI GON TRAIN JOINT STOCK COMPANY'
    },
    {
      code: 'TAW',
      companyName: 'Công ty Cổ phần Cấp nước Trung An',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Trung An',
      companyNameEn: 'Trung An Water Supply Joint Stock Company'
    },
    {
      code: 'AAT',
      companyName: 'Công ty cổ phần Tiên Sơn Thanh Hoá',
      exchange: 'HOSE',
      shortName: 'Tiên Sơn Thanh Hóa',
      companyNameEn: 'TIEN SON THANH HOA JOINT STOCK COMPANY'
    },
    {
      code: 'TTS',
      companyName: 'Công ty cổ phần Cán thép Thái Trung',
      exchange: 'UPCOM',
      shortName: 'Cán thép Th.Trung',
      companyNameEn: 'Thai Trung Steel Joint stock company'
    },
    {
      code: 'UPH',
      companyName: 'Công ty Cổ phần Dược phẩm TW25',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm TW25',
      companyNameEn: 'No 25 Central Phamaceutical Joint Stock Company'
    },
    {
      code: 'VGL',
      companyName: 'Công ty cổ phần Mạ kẽm công nghiệp Vingal - Vnsteel',
      exchange: 'UPCOM',
      shortName: 'Mạ kẽm Vingal',
      companyNameEn: 'Vingal - Vnsteel Industries Joint Stock Company'
    },
    {
      code: 'VJC',
      companyName: 'Công ty cổ phần Hàng không VIETJET',
      exchange: 'HOSE',
      shortName: 'VIETJETAIR',
      companyNameEn: 'VIETJET Aviation Joint Stock Company'
    },
    {
      code: 'VTE',
      companyName: 'Công ty cổ phần Viễn thông Điện tử VINACAP',
      exchange: 'UPCOM',
      shortName: 'V.thông VINACAP',
      companyNameEn: 'VINACAP TELECOM ELECTRONICS JOINT STOCK COMPANY'
    },
    {
      code: 'VTR',
      companyName: 'Công ty cổ phần Du lịch và Tiếp thị Giao thông Vận tải Việt Nam - Vietravel',
      exchange: 'UPCOM',
      shortName: 'Vietravel',
      companyNameEn: 'Vietnam Travel and Marketing Transports Joint Stock Company'
    },
    {
      code: 'FCS',
      companyName: 'Công ty cổ phần Lương thực thành phố Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'Lương thực TP.HCM',
      companyNameEn: 'Ho Chi Minh City Food Joint Stock Company'
    },
    {
      code: 'CDH',
      companyName: 'Công ty cổ phần Công trình công cộng và dịch vụ du lịch Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Du lịch Hải Phòng',
      companyNameEn: 'Hai Phong Public works and Tourism services joint stock company'
    },
    {
      code: 'DNR',
      companyName: 'Công ty cổ phần Đường sắt Quảng Nam - Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Quảng Nam',
      companyNameEn: 'Quang Nam - Da Nang Rail way Joint Stock Company'
    },
    {
      code: 'USC',
      companyName: 'Công ty Cổ phần Khảo sát và Xây dựng - USCO',
      exchange: 'UPCOM',
      shortName: 'USCO',
      companyNameEn: 'Union of Survey and Construction Joint Stock Company'
    },
    {
      code: 'VCE',
      companyName: 'Công ty Cổ phần Xây lắp Môi trường',
      exchange: 'UPCOM',
      shortName: 'Xây lắp Môi trường',
      companyNameEn: 'CONSTRUCTION ENVIRONMENT JOINT STOCK COMPANY'
    },
    {
      code: 'ADS',
      companyName: 'Công ty Cổ phần Damsan',
      exchange: 'HOSE',
      shortName: 'CTCP Damsan',
      companyNameEn: 'Damsan Joint stock company'
    },
    {
      code: 'HCD',
      companyName: 'Công ty cổ phần Đầu tư Sản xuất và Thương mại HCD',
      exchange: 'HOSE',
      shortName: 'Đ.tư SX T.mại HCD',
      companyNameEn: 'HCD INVESTMENT PRODUCING AND TRADING JOINT STOCK COMPANY'
    },
    {
      code: 'DDH',
      companyName: 'Công ty cổ phần Đảm bảo giao thông đường thủy Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Đg thủy H.Phòng',
      companyNameEn: 'HAI PHONG WATERWAY TRAFFIC ASSURANCE JOINT STOCK COMPANY'
    },
    {
      code: 'GLW',
      companyName: 'Công ty cổ phần Cấp thoát nước Gia Lai',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Gia Lai',
      companyNameEn: 'Gia Lai Water Supply Sewerange Joint Stock Company'
    },
    {
      code: 'BEL',
      companyName: 'CÔNG TY CỔ PHẦN ĐIỆN TỬ BIÊN HÒA',
      exchange: 'UPCOM',
      shortName: 'Điện tử Biên Hòa',
      companyNameEn: 'VIETTRONICS BIEN HOA JOINT STOCK COMPANY'
    },
    {
      code: 'VNB',
      companyName: 'Công ty cổ phần Sách Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Sách Việt Nam',
      companyNameEn: 'VIET NAM BOOKS JOINT STOCK COMPANY'
    },
    {
      code: 'DT4',
      companyName: 'Công ty Cổ phần Quản lý bảo trì đường thủy nội địa số 4',
      exchange: 'UPCOM',
      shortName: 'Q.lý đg thủy số 4',
      companyNameEn: 'INLAND WATERWAYS MANAGEMENT AND MAINTENANCE JOINT STOCK COMPANY N04'
    },
    {
      code: 'CTP',
      companyName: 'CÔNG TY CỔ PHẦN MINH KHANG CAPITAL TRADING PUBLIC',
      exchange: 'HNX',
      shortName: 'CTCP Minh Khang',
      companyNameEn: 'MINH KHANG CAPITAL TRADING PUBLIC JOINT STOCK COMPANY'
    },
    {
      code: 'NLS',
      companyName: 'Công ty cổ phần Cấp thoát nước Lạng Sơn',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc L.Sơn',
      companyNameEn: 'Lang Son water supply and drainage jointstock company'
    },
    {
      code: 'VEA',
      companyName: 'Tổng công ty Máy Động lực và Máy Nông nghiệp Việt Nam – CTCP',
      exchange: 'UPCOM',
      shortName: 'Máy N.nghiệp VN',
      companyNameEn: 'Vietnam Engine and Agricultural Machinery Corporation'
    },
    {
      code: 'BDT',
      companyName: 'Công ty cổ phần Xây lắp và Vật liệu xây dựng Đồng Tháp',
      exchange: 'UPCOM',
      shortName: 'VLXD Đồng Tháp',
      companyNameEn: 'DongThap Building Materials & Construction Joint Stock Company'
    },
    {
      code: 'AMS',
      companyName: 'Công ty cổ phần Cơ khí Xây dựng AMECC',
      exchange: 'UPCOM',
      shortName: 'C.khí XD AMECC',
      companyNameEn: 'AMECC Mechanical Construction Joint Stock Company'
    },
    {
      code: 'RAT',
      companyName: 'Công ty Cổ phần Vận tải và Thương mại Đường Sắt',
      exchange: 'UPCOM',
      shortName: 'V.tải T.mại Đ.sắt',
      companyNameEn: 'Railway transport and trade joint stock company'
    },
    {
      code: 'SPB',
      companyName: 'Công ty cổ phần Sợi Phú Bài',
      exchange: 'UPCOM',
      shortName: 'Sợi Phú Bài',
      companyNameEn: 'Phu Bai Spinning Mill Joint Stock Company'
    },
    {
      code: 'BSD',
      companyName: 'Công ty cổ phần Bia, Rượu Sài Gòn - Đồng Xuân',
      exchange: 'UPCOM',
      shortName: 'Bia SG Đồng Xuân',
      companyNameEn: 'Sai Gon - Dong Xuan Beer Alcohol Joint Stock Company'
    },
    {
      code: 'NBR',
      companyName: 'Công ty cổ phần Đường sắt Nghĩa Bình',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Nghĩa Bình',
      companyNameEn: 'NGHIA BINH RAIL WAY JOINT STOCK COMPANY'
    },
    {
      code: 'BTR',
      companyName: 'Công ty cổ phần Đường sắt Bình Trị Thiên',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Bình Trị Thiên',
      companyNameEn: 'Binh Tri Thiên Railway Joint Stock Company'
    },
    {
      code: 'ROS',
      companyName: 'Công ty cổ phần Xây dựng FLC Faros',
      exchange: 'HOSE',
      shortName: 'Xây dựng FLC Faros',
      companyNameEn: 'FAROS CONSTRUCTION CORPORATION'
    },
    {
      code: 'TAP',
      companyName: 'Công ty cổ phần Đô thị Tân An',
      exchange: 'UPCOM',
      shortName: 'Đô Thị Tân An',
      companyNameEn: 'TAN AN PUBLIC SERVICES JOINT STOCK COMPANY'
    },
    {
      code: 'CDR',
      companyName: 'Công ty Cổ phần Xây dựng Cao su Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'XD Cao su Đồng Nai',
      companyNameEn: 'Dong Nai Rubber Construction Joint Stock Company'
    },
    {
      code: 'YRC',
      companyName: 'Công ty cổ phần Đường sắt Yên Lào',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Yên lào',
      companyNameEn: 'Yenlao Railway Join Stock Company'
    },
    {
      code: 'BLN',
      companyName: 'Công ty cổ phần Vận tải và dịch vụ Liên Ninh',
      exchange: 'UPCOM',
      shortName: 'V.tải Liên Ninh',
      companyNameEn: 'Lien Ninh Transport and Service Joint Stock Company'
    },
    {
      code: 'HRT',
      companyName: 'Công ty cổ phần Vận tải Đường sắt Hà Nội',
      exchange: 'UPCOM',
      shortName: 'V.tải Đ.sắt HN',
      companyNameEn: 'HaNoi Railway Transport Join Stock Company'
    },
    {
      code: 'VLB',
      companyName: 'Công ty Cổ phần Xây dựng và Sản xuất vật liệu xây dựng Biên Hòa',
      exchange: 'UPCOM',
      shortName: 'VLXD Biên Hòa',
      companyNameEn: 'BIEN HOA BUILDING MATERIALS PRODUCTION AND CONSTRUCTION JOINT STOCK COMPANY'
    },
    {
      code: 'VWS',
      companyName: 'Công ty cổ phần Nước và Môi trường Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Nước & M.trường VN',
      companyNameEn: 'Vietnam Water, Sanitation and Environment Joint Stock Company - JSC'
    },
    {
      code: 'TCH',
      companyName: 'Công ty Cổ phần Đầu tư Dịch vụ Tài chính Hoàng Huy',
      exchange: 'HOSE',
      shortName: 'T.chính Hoàng Huy',
      companyNameEn: 'Hoang Huy Investment Financial Services Joint Stock Company'
    },
    {
      code: 'TQW',
      companyName: 'Công ty Cổ phần Cấp thoát nước Tuyên Quang',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Tuyên Quang',
      companyNameEn: 'Tuyen Quang Water Supply And Sewerage Joint Stock Company'
    },
    {
      code: 'SP2',
      companyName: 'Công ty cổ phần Thủy điện Sử Pán 2',
      exchange: 'UPCOM',
      shortName: 'Th.điện Sứ Pán 2',
      companyNameEn: 'Su Pan 2 Hydroprwer Joint Stock Company'
    },
    {
      code: 'APL',
      companyName: 'Công ty cổ phần Cơ khí và thiết bị áp lực – VVMI',
      exchange: 'UPCOM',
      shortName: 'Cơ khí T.bị áp lực',
      companyNameEn: 'VVMI – Mechanical And Pressure Equipment Joint Stock Company'
    },
    {
      code: 'TTV',
      companyName: 'Công ty cổ phần Thông tin Tín hiệu Đường sắt Vinh',
      exchange: 'UPCOM',
      shortName: 'Tín hiệu Đ.sắt Vinh',
      companyNameEn: 'Vinh Railway Signalling - Telecom Joint Stock Company'
    },
    {
      code: 'L63',
      companyName: 'Công ty Cổ phần Lilama 69-3',
      exchange: 'UPCOM',
      shortName: 'Lilama 69-3',
      companyNameEn: 'Lilama 69-3 Joint Stock Company'
    },
    {
      code: 'DAH',
      companyName: 'Công ty cổ phần Tập đoàn Khách sạn Đông Á',
      exchange: 'HOSE',
      shortName: 'Khách Sạn Đông Á',
      companyNameEn: 'Dong A Hotel Group Joint Stock Company'
    },
    {
      code: 'BMV',
      companyName: 'Công ty Cổ phần Bột mỳ Vinafood 1',
      exchange: 'UPCOM',
      shortName: 'Vinafood 1',
      companyNameEn: 'Vinafood 1 Flour Joint Stock Company'
    },
    {
      code: 'DTK',
      companyName: 'Tổng công ty Điện lực TKV - CTCP',
      exchange: 'HNX',
      shortName: 'TCT Điện lực TKV',
      companyNameEn: 'Vinacomin – Power Holding Corporation'
    },
    {
      code: 'GTD',
      companyName: 'Công ty cổ phần Giầy Thượng Đình',
      exchange: 'UPCOM',
      shortName: 'Giầy Thượng Đình',
      companyNameEn: 'Thuongdinh Footwear Joint Stock Company'
    },
    {
      code: 'NNB',
      companyName: 'Công ty cổ phần Cấp thoát nước Ninh Bình',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc N.Bình',
      companyNameEn: 'Ninh Binh Water Supply And Sewerage Joint Stock Company'
    },
    {
      code: 'L45',
      companyName: 'Công ty cổ phần Lilama 45.1',
      exchange: 'UPCOM',
      shortName: 'Lilama 45.1',
      companyNameEn: 'Lilama 45.1 Joint Stock Company'
    },
    {
      code: 'GTS',
      companyName: 'Công ty cổ phần Công trình Giao thông Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'C.trình GT SG',
      companyNameEn: 'Saigon Traffic Construction Joint Stock Company'
    },
    {
      code: 'TTH',
      companyName: 'Công ty Cổ phần Thương mại và Dịch vụ Tiến Thành',
      exchange: 'HNX',
      shortName: 'DV Tiến Thành',
      companyNameEn: 'Tien Thanh Service and Trading Joint Stock Company'
    },
    {
      code: 'IBC',
      companyName: 'Công ty cổ phần Đầu tư APAX HOLDINGS',
      exchange: 'HOSE',
      shortName: 'ĐT APAX HOLDINGS',
      companyNameEn: 'APAX HOLDINGS Joint Stock Company'
    },
    {
      code: 'RTS',
      companyName: 'Công ty cổ phần Thông tin tín hiệu Đường sắt Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'Tín hiệu Đ.sắt ĐN',
      companyNameEn: 'Danang Railway Telecommunication – Signalization Joint Stock Company'
    },
    {
      code: 'SAC',
      companyName: 'Công ty cổ phần Xếp dỡ và Dịch vụ Cảng Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Xếp dỡ Cảng SG',
      companyNameEn: 'Sai Gon Port Stevedoring and Service Joint Stock Company'
    },
    {
      code: 'CQT',
      companyName: 'Công Ty Cổ Phần Xi Măng Quán Triều VVMI',
      exchange: 'UPCOM',
      shortName: 'Quán Triều VVMI',
      companyNameEn: 'VVMI Quan Trieu Cement Joint Stock Company'
    },
    {
      code: 'HWS',
      companyName: 'Công ty Cổ phần Cấp nước Thừa Thiên Huế',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Huế',
      companyNameEn: 'Thua Thien Hue Water Suppy Joint Stock Company'
    },
    {
      code: 'XHC',
      companyName: 'Công ty cổ phần Xuân Hòa Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Xuân Hòa Việt Nam',
      companyNameEn: 'Xuan Hoa Viet Nam Joint Stock Company'
    },
    {
      code: 'LIC',
      companyName: 'Tổng Công ty LICOGI - CTCP',
      exchange: 'UPCOM',
      shortName: 'LICOGI',
      companyNameEn: 'LICOGI Corporation - JSC'
    },
    {
      code: 'RTB',
      companyName: 'Công ty cổ phần Cao su Tân Biên',
      exchange: 'UPCOM',
      shortName: 'Cao su Tân Biên',
      companyNameEn: 'TANBIEN RUBBER JOINT STOCK COMPANY'
    },
    {
      code: 'TVU',
      companyName: 'Công ty cổ phần Công trình Đô thị Trà Vinh',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị Trà Vinh',
      companyNameEn: 'TRA VINH URBAN PROJECT JOINT STOCK COMPANY'
    },
    {
      code: 'QBR',
      companyName: 'Công ty cổ phần Đường sắt Quảng Bình',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Quảng Bình',
      companyNameEn: 'Quang Binh Railway Joint Stock Company'
    },
    {
      code: 'NTR',
      companyName: 'Công ty cổ phần Đường sắt Nghệ Tĩnh',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Nghệ Tĩnh',
      companyNameEn: 'NGHE TINH RAILWAY JOINT STOCK COMPANY'
    },
    {
      code: 'UCT',
      companyName: 'Công ty cổ phần Đô thị Cần Thơ',
      exchange: 'UPCOM',
      shortName: 'Đô Thị Cần Thơ',
      companyNameEn: 'Can Tho Urban Joint Stock Company'
    },
    {
      code: 'PC1',
      companyName: 'Công ty cổ phần Xây lắp điện I',
      exchange: 'HOSE',
      shortName: 'Xây lắp điện I',
      companyNameEn: 'Power Construction Joint Stock Company No.1'
    },
    {
      code: 'POS',
      companyName: 'Công ty cổ phần Dịch vụ Lắp đặt, Vận hành và Bảo dưỡng Công trình Dầu khí biển PTSC',
      exchange: 'UPCOM',
      shortName: 'C.trình D.khí biển',
      companyNameEn: 'PTSC Offshore Services Joint Stock Company'
    },
    {
      code: 'PHN',
      companyName: 'Công ty cổ phần Pin Hà Nội',
      exchange: 'HNX',
      shortName: 'Pin Hà Nội',
      companyNameEn: 'Ha noi Batteries Joint Stock Company'
    },
    {
      code: 'LCW',
      companyName: 'Công ty Cổ phần nước sạch Lai Châu',
      exchange: 'UPCOM',
      shortName: 'Nước Lai Châu',
      companyNameEn: 'Lai Chau Clean Water Joint Stock Company'
    },
    {
      code: 'NS2',
      companyName: 'Công ty Cổ phần Nước sạch số 2 Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Nước sạch số 2 HN',
      companyNameEn: 'Hanoi Water Supply Number 2 Joint Stock Company'
    },
    {
      code: 'HLR',
      companyName: 'Công ty cổ phần Đường sắt Hà Lạng',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Hà Lạng',
      companyNameEn: 'Ha Lang Railways Joint Stock Company'
    },
    {
      code: 'HTU',
      companyName: 'Công ty Cổ phần Môi trường và Công trình đô thị Hà Tĩnh',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị H.Tĩnh',
      companyNameEn: 'Ha Tinh Urban and Environment Joint Stock Company'
    },
    {
      code: 'SZE',
      companyName: 'Công ty cổ phần Môi trường Sonadezi',
      exchange: 'UPCOM',
      shortName: 'M.trường Sonadezi',
      companyNameEn: 'Sonadezi Environment Joint Stock Company'
    },
    {
      code: 'HNT',
      companyName: 'Công ty cổ phần Xe điện Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Xe điện Hà Nội',
      companyNameEn: 'Ha Noi Tram Joint Stock Company'
    },
    {
      code: 'DSV',
      companyName: 'Công ty cổ phần Đường sắt Vĩnh Phú',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Vĩnh Phú',
      companyNameEn: 'Vinh Phu Railway Joint Stock Company'
    },
    {
      code: 'PSN',
      companyName: 'Công ty cổ phần Cảng Dịch vụ Dầu khí Tổng hợp PTSC Thanh Hóa',
      exchange: 'UPCOM',
      shortName: 'Cảng DV DK Th.Hóa',
      companyNameEn: 'PTSC Thanh Hoa Joint Stock Company'
    },
    {
      code: 'DOC',
      companyName: 'Công ty cổ phần Vật tư nông nghiệp Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'V.tư N.nghiệp Đ.Nai',
      companyNameEn: 'Dong Nai Joint Stock Company Of Agricultural Material'
    },
    {
      code: 'MES',
      companyName: 'Công ty Cổ phần Cơ điện Công trình',
      exchange: 'UPCOM',
      shortName: 'Cơ điện Công trình',
      companyNameEn: 'Mechanical, Engineering Service Joint Stock Company'
    },
    {
      code: 'NQT',
      companyName: 'Công ty cổ phần Nước sạch Quảng Trị',
      exchange: 'UPCOM',
      shortName: 'Nước Quảng Trị',
      companyNameEn: 'Quang Tri Clean Water Joint Stock Company'
    },
    {
      code: 'HTW',
      companyName: 'Công ty Cổ phần cấp nước Hà Tĩnh',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Hà Tĩnh',
      companyNameEn: 'Hatinh Water Supply Joint Stock Company'
    },
    {
      code: 'TVT',
      companyName: 'Tổng công ty Việt Thắng - CTCP',
      exchange: 'HOSE',
      shortName: 'TCT Việt Thắng',
      companyNameEn: 'Viet Thang Corporation'
    },
    {
      code: 'RLC',
      companyName: 'Công ty cổ phần Đường bộ Lào Cai',
      exchange: 'UPCOM',
      shortName: 'Đường bộ Lào Cai',
      companyNameEn: 'Lao Cai Road Joint Stock Company'
    },
    {
      code: 'NVP',
      companyName: 'Công ty cổ phần Nước sạch Vĩnh Phúc',
      exchange: 'UPCOM',
      shortName: 'Nước Vĩnh Phúc',
      companyNameEn: 'Vinh Phuc Water Supply Joint Stock Company'
    },
    {
      code: 'IST',
      companyName: 'Công ty cổ phần ICD Tân Cảng Sóng Thần',
      exchange: 'UPCOM',
      shortName: 'Tân Cảng Sóng Thần',
      companyNameEn: 'Tan Cang Song Than ICD Joint Stock Company'
    },
    {
      code: 'HHN',
      companyName: 'Công ty cổ phần Vận tải và Dịch vụ hàng hóa Hà Nội',
      exchange: 'UPCOM',
      shortName: 'V.tải hàng hóa HN',
      companyNameEn: 'Ha Noi Goods services and transport Joint Stock Company'
    },
    {
      code: 'ART',
      companyName: 'Công ty cổ phần Chứng khoán BOS',
      exchange: 'HNX',
      shortName: 'Chứng khoán BOS',
      companyNameEn: 'BOS Securities Joint Stock Company'
    },
    {
      code: 'SSU',
      companyName: 'Công ty Cổ phần Môi trường Đô thị Sóc Sơn',
      exchange: 'UPCOM',
      shortName: 'Đô thị Sóc Sơn',
      companyNameEn: 'Soc Son Urban Environment Joint Stock Company'
    },
    {
      code: 'VPR',
      companyName: 'CÔNG TY CỔ PHẦN VINAPRINT',
      exchange: 'UPCOM',
      shortName: 'CTCP VINAPRINT',
      companyNameEn: 'VINAPRINT CORPORATION'
    },
    {
      code: 'NS3',
      companyName: 'Công ty Cổ phần sản xuất kinh doanh nước sạch số 3 Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Nước sạch số 3 HN',
      companyNameEn: 'Ha Noi Water Manufacturing Joint Stock Company No 3'
    },
    {
      code: 'CBC',
      companyName: 'Công ty cổ phần Chè Bàu Cạn',
      exchange: 'UPCOM',
      shortName: 'Chè Bàu Cạn',
      companyNameEn: 'Bau Can Tea Joint Stock Company'
    },
    {
      code: 'HKT',
      companyName: 'Công ty cổ phần Đầu tư EGO Việt Nam',
      exchange: 'HNX',
      shortName: 'Đầu tư EGO Việt Nam',
      companyNameEn: 'EGO Viet Nam Investment Joint Stock Company'
    },
    {
      code: 'MLS',
      companyName: 'Công ty Cổ phần Chăn nuôi - Mitraco',
      exchange: 'UPCOM',
      shortName: 'Chăn nuôi Mitraco',
      companyNameEn: 'Mitraco Livestock Joint Stock Company'
    },
    {
      code: 'SB1',
      companyName: 'Công ty cổ phần bia Sài Gòn - Nghệ Tĩnh',
      exchange: 'UPCOM',
      shortName: 'Bia SG Nghệ Tĩnh',
      companyNameEn: 'SaiGon - NgheTinh Beer Joint Stock Company'
    },
    {
      code: 'C12',
      companyName: 'Công ty Cổ phần Cầu 12',
      exchange: 'UPCOM',
      shortName: 'CTCP Cầu 12',
      companyNameEn: 'Bridge Joint Stock Company No.12'
    },
    {
      code: 'QNW',
      companyName: 'Công ty cổ phần Cấp thoát nước và Xây dựng Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Q.Ngãi',
      companyNameEn: 'Quang Ngai Water Supply Sewerage And Construction Joint Stock Company'
    },
    {
      code: 'GCB',
      companyName: 'Công ty cổ phần Petec Bình Định',
      exchange: 'UPCOM',
      shortName: 'Petec Bình Định',
      companyNameEn: 'Petec Binh Dinh Joint Stock Company'
    },
    {
      code: 'TB8',
      companyName: 'Công ty cổ phần Sản xuất và kinh doanh Vật tư Thiết bị - VVMI',
      exchange: 'UPCOM',
      shortName: 'Vật tư T.bị VVMI',
      companyNameEn: 'VVMI – Manufacturing and Materials Equipment Trading Joint Stock Company'
    },
    {
      code: 'MCT',
      companyName: 'Công ty cổ phần Kinh doanh vật tư và Xây dựng',
      exchange: 'UPCOM',
      shortName: 'K.doanh V.tư XD',
      companyNameEn: 'Material Trading And Construction Joint Stock Company'
    },
    {
      code: 'L12',
      companyName: 'Công ty cổ phần Licogi 12',
      exchange: 'UPCOM',
      shortName: 'CTCP Licogi 12',
      companyNameEn: 'Licogi 12 Joint Stock Company'
    },
    {
      code: 'CCV',
      companyName: 'Công ty cổ phần Tư vấn Xây dựng Công nghiệp và Đô thị Việt Nam',
      exchange: 'UPCOM',
      shortName: 'XD C.nghiệp & Đ.thị VN',
      companyNameEn: 'VCC Engineering Consultants Joint Stock Company'
    },
    {
      code: 'BTB',
      companyName: 'Công ty Cổ phần Bia Hà Nội - Thái Bình',
      exchange: 'UPCOM',
      shortName: 'Bia HN Thái Bình',
      companyNameEn: 'Ha Noi - Thai Binh Beer Joint Stock Company'
    },
    {
      code: 'X77',
      companyName: 'Công ty cổ phần Thành An 77',
      exchange: 'UPCOM',
      shortName: 'CTCP Thành An 77',
      companyNameEn: 'Thanh An 77 Joint Stock Company'
    },
    {
      code: 'PKR',
      companyName: 'Công ty cổ phần Đường sắt Phú Khánh',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Phú Khánh',
      companyNameEn: 'Phu Khanh Railway Joint Stock Company'
    },
    {
      code: 'CMD',
      companyName: 'Công ty cổ phần Vật liệu Xây dựng và Trang trí nội thất Thành phố Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'XD & trang trí HCM',
      companyNameEn: 'Construction Material & Interior Decoration Joint Stock Company'
    },
    {
      code: 'PND',
      companyName: 'Công ty cổ phần Xăng dầu Dầu khí Nam Định',
      exchange: 'UPCOM',
      shortName: 'Dầu khí Nam Định',
      companyNameEn: 'Petrovietnam Oil Nam Dinh Joint Stock Company'
    },
    {
      code: 'KHW',
      companyName: 'Công ty cổ phần Cấp thoát nước Khánh Hòa',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Kh.Hòa',
      companyNameEn: 'Khanh Hoa Water Supply And Sewerage Joint Stock Company'
    },
    {
      code: 'HHR',
      companyName: 'Công ty cổ phần Đường sắt Hà Hải',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Hà Hải',
      companyNameEn: 'Ha Hai Railway Joint Stock Company'
    },
    {
      code: 'EMG',
      companyName: 'Công ty Cổ Phần Thiết Bị Phụ Tùng Cơ điện',
      exchange: 'UPCOM',
      shortName: 'Phụ tùng Cơ điện',
      companyNameEn: 'Electrical Mechanical Equipment And Spare Parts Joint Stock Company'
    },
    {
      code: 'NUE',
      companyName: 'Công ty cổ phần Môi trường Đô thị Nha Trang',
      exchange: 'UPCOM',
      shortName: 'Đô thị Nha Trang',
      companyNameEn: 'Nha Trang Urban Environmental Joint Stock Company'
    },
    {
      code: 'PIA',
      companyName: 'Công ty cổ phần Tin học Viễn thông Petrolimex',
      exchange: 'HNX',
      shortName: 'V.thông Petrolimex',
      companyNameEn: 'Petrolimex Information Technology and Telecommunication Joint Stock Company'
    },
    {
      code: 'TUG',
      companyName: 'Công ty cổ phần Lai dắt và Vận tải Cảng Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'V.tải Cảng H.Phòng',
      companyNameEn: 'Haiphong Port Tugboat And Transport Joint Stock Company'
    },
    {
      code: 'RTH',
      companyName: 'Công ty cổ phần Đường sắt Thanh Hóa',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Thanh Hóa',
      companyNameEn: 'Thanh Hoa Railway Joint Stock Company'
    },
    {
      code: 'HTR',
      companyName: 'Công ty cổ phần Đường sắt Hà Thái',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Hà Thái',
      companyNameEn: 'HaThai Railway Joint Stock Company'
    },
    {
      code: 'HTT',
      companyName: 'Công ty Cổ phần Thương mại Hà Tây',
      exchange: 'UPCOM',
      shortName: 'Thương mại Hà Tây',
      companyNameEn: 'Ha Tay Trading Joint stock company'
    },
    {
      code: 'PWA',
      companyName: 'Công ty Cổ phần Bất động sản Dầu khí',
      exchange: 'UPCOM',
      shortName: 'PETROWACO',
      companyNameEn: 'PETROWACO PROPERTY JOINT STOCK COMPANY'
    },
    {
      code: 'DTG',
      companyName: 'Công ty Cổ phần Dược phẩm Tipharco',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm Tipharco',
      companyNameEn: 'TIPHARCO Pharmaceutical Joint Stock Company'
    },
    {
      code: 'BTV',
      companyName: 'Công ty Cổ phần Dịch vụ du lịch Bến Thành',
      exchange: 'UPCOM',
      shortName: 'Du lịch Bến Thành',
      companyNameEn: 'Ben Thanh Tourist Service Corporation'
    },
    {
      code: 'BSQ',
      companyName: 'Công ty cổ phần Bia Sài Gòn - Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'Bia SG Q.Ngãi',
      companyNameEn: 'Saigon - Quang Ngai Beer Joint Stock Company'
    },
    {
      code: 'VIH',
      companyName: 'Công ty Cổ phần Viglacera Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Viglacera Hà Nội',
      companyNameEn: 'Viglacera Ha Noi Joint Stock Company'
    },
    {
      code: 'QNU',
      companyName: 'Công ty cổ phần Môi trường Đô thị Quảng Nam',
      exchange: 'UPCOM',
      shortName: 'Đô thị Quảng Nam',
      companyNameEn: 'Quang Nam Urban Environment Joint Stock Company'
    },
    {
      code: 'MC3',
      companyName: 'Công ty cổ phần Khoáng sản 3 - Vimico',
      exchange: 'UPCOM',
      shortName: 'K.sản 3 - Vimico',
      companyNameEn: 'Minerals Joint Stock Company No3 – Vimico'
    },
    {
      code: 'MTS',
      companyName: 'Công ty Cổ phần Vật tư - TKV',
      exchange: 'UPCOM',
      shortName: 'CTCP Vật tư - TKV',
      companyNameEn: 'Vinacomin - Materials Trading Joint stock company'
    },
    {
      code: 'TVA',
      companyName: 'Công ty Cổ phần Sứ Viglacera Thanh Trì',
      exchange: 'UPCOM',
      shortName: 'Viglacera Thanh Trì',
      companyNameEn: 'Viglacera Thanh Tri Sanitary Joint Stock Company'
    },
    {
      code: 'VSM',
      companyName: 'Công ty Cổ phần Container Miền Trung',
      exchange: 'HNX',
      shortName: 'Container M.Trung',
      companyNameEn: 'Central Container Joint stock company'
    },
    {
      code: 'HDP',
      companyName: 'Công ty Cổ phần Dược Hà Tĩnh',
      exchange: 'UPCOM',
      shortName: 'Dược Hà Tĩnh',
      companyNameEn: 'HaTinh Pharmaceutical Joint Stock Company'
    },
    {
      code: 'SZC',
      companyName: 'Công ty cổ phần Sonadezi Châu Đức',
      exchange: 'HOSE',
      shortName: 'Sonadezi Châu Đức',
      companyNameEn: 'Sonadezi Chau Duc Shareholding Company'
    },
    {
      code: 'ATB',
      companyName: 'Công ty Cổ phần An Thịnh',
      exchange: 'UPCOM',
      shortName: 'CTCP An Thịnh',
      companyNameEn: 'An Thinh Joint Stock Company'
    },
    {
      code: 'TRT',
      companyName: 'Công ty cổ phần Trúc Thôn',
      exchange: 'UPCOM',
      shortName: 'CTCP Trúc Thôn',
      companyNameEn: 'Tructhon Joint Stock Company'
    },
    {
      code: 'RHN',
      companyName: 'Công ty cổ phần Đường sắt Hà Ninh',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Hà Ninh',
      companyNameEn: 'HaNinh Railway Joint Stock Company'
    },
    {
      code: 'CCP',
      companyName: 'Công ty Cổ phần Cảng Cửa Cấm Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Cảng Cửa Cấm HP',
      companyNameEn: 'Hai Phong Cua Cam Port Joint Stock Company'
    },
    {
      code: 'THR',
      companyName: 'Công ty Cổ phần Đường sắt Thuận Hải',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Thuận Hải',
      companyNameEn: 'Thuan Hai Railway Joint Stock Company'
    },
    {
      code: 'HCS',
      companyName: 'Công ty cổ phần Thông tin Tín hiệu Đường sắt Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Tín hiệu Đ.sắt HN',
      companyNameEn: 'Hanoi Railway Singal & Telecom Joint Stock Company'
    },
    {
      code: 'VBG',
      companyName: 'Công ty cổ phần Địa chất Việt Bắc - TKV',
      exchange: 'UPCOM',
      shortName: 'Địa chất Việt Bắc',
      companyNameEn: 'Vinacomin - Viet Bac Geology Joint Stock Company'
    },
    {
      code: 'TLP',
      companyName: 'Tổng công ty Thương mại Xuất nhập khẩu Thanh Lễ – CTCP',
      exchange: 'UPCOM',
      shortName: 'XNK Thanh Lễ',
      companyNameEn: 'Thanh Le Corporation'
    },
    {
      code: 'PCF',
      companyName: 'Công ty Cổ phần Cà Phê PETEC',
      exchange: 'UPCOM',
      shortName: 'CTCP Cà Phê PETEC',
      companyNameEn: 'PETEC Coffee Joint Stock Company'
    },
    {
      code: 'HFB',
      companyName: 'Công ty cổ phần Công trình Cầu phà Thành phố Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'Cầu phà TP.HCM',
      companyNameEn: 'Ho Chi Minh City Ferry Bridge Construction Joint Stock Company'
    },
    {
      code: 'CE1',
      companyName: 'Công ty Cổ phần Xây dựng và Thiết bị Công nghiệp CIE1',
      exchange: 'UPCOM',
      shortName: 'T.bị C.nghiệp CIE1',
      companyNameEn: 'Construction And Industry Equipment Joint Stock Company - CIE1'
    },
    {
      code: 'CEG',
      companyName: 'Công ty Cổ phần Tập đoàn Xây dựng và thiết bị Công nghiệp',
      exchange: 'UPCOM',
      shortName: 'Tập đoàn XD & T.bị CN',
      companyNameEn: 'Construction and Industry Equipment Group Corporation'
    },
    {
      code: 'CQN',
      companyName: 'Công ty cổ phần Cảng Quảng Ninh',
      exchange: 'UPCOM',
      shortName: 'Cảng Quảng Ninh',
      companyNameEn: 'Quang Ninh Port Joint Stock Company'
    },
    {
      code: 'DRI',
      companyName: 'Công ty Cổ phần Đầu tư cao su Đắk Lắk',
      exchange: 'UPCOM',
      shortName: 'ĐT Cao su Đắk Lắk',
      companyNameEn: 'Daklak Rubber Investment Joint stock company'
    },
    {
      code: 'MTV',
      companyName: 'Công ty Cổ phần Dịch vụ Môi trường và Công trình Đô thị Vũng Tàu',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị V.Tàu',
      companyNameEn: 'Vung Tau Environment Services and Urban Project Joint Stock Company'
    },
    {
      code: 'SBV',
      companyName: 'Công ty Cổ phần Siam Brothers Việt Nam',
      exchange: 'HOSE',
      shortName: 'Siam Brothers VN',
      companyNameEn: 'Siam Brothers Vietnam Joint stock company'
    },
    {
      code: 'QLT',
      companyName: 'Công ty cổ phần Quản lý Bảo trì Đường thủy nội địa số 10',
      exchange: 'UPCOM',
      shortName: 'Đg thủy số 10',
      companyNameEn: 'Inland Waterway Management Maintenance Joint Stock Company No.10'
    },
    {
      code: 'DNE',
      companyName: 'Công ty cổ phần Môi trường Đô thị Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'Đô thị Đà Nẵng',
      companyNameEn: 'DaNang Urban Environment Joint Stock Company'
    },
    {
      code: 'CMW',
      companyName: 'Công ty Cổ phần cấp nước Cà Mau',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Cà Mau',
      companyNameEn: 'Ca Mau Water Supply Joint Stock Company'
    },
    {
      code: 'MLC',
      companyName: 'Công ty Cổ phần Môi trường Đô thị tỉnh Lào Cai',
      exchange: 'UPCOM',
      shortName: 'Đô thị Lào Cai',
      companyNameEn: 'Lao Cai urban Environment Joint stock company'
    },
    {
      code: 'TSG',
      companyName: 'Công ty Cổ phần Thông tin Tín hiệu Đường sắt Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Tín hiệu Đ.sắt SG',
      companyNameEn: 'Sai Gon Railway of Telecommunication - Signalization Joint Stock Company'
    },
    {
      code: 'C69',
      companyName: 'Công ty cổ phần Xây dựng 1369',
      exchange: 'HNX',
      shortName: 'CTCP Xây dựng 1369',
      companyNameEn: '1369 CONSTRUCTION JOINT STOCK COMPANY'
    },
    {
      code: 'CCT',
      companyName: 'Công ty Cổ phần Cảng Cần Thơ',
      exchange: 'UPCOM',
      shortName: 'Cảng Cần Thơ',
      companyNameEn: 'Cantho Port Joint stock company'
    },
    {
      code: 'HEJ',
      companyName: 'Tổng công ty Tư vấn Xây dựng Thủy Lợi Việt Nam - CTCP',
      exchange: 'UPCOM',
      shortName: 'XD Thủy Lợi VN',
      companyNameEn: 'Vietnam Hydraulic Engineering Consultants Corporation-Jsc'
    },
    {
      code: 'LMI',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng lắp máy IDICO',
      exchange: 'UPCOM',
      shortName: 'Lắp máy IDICO',
      companyNameEn: 'IDICO Machinery Erection Construction Investment Joint Stock Company'
    },
    {
      code: 'BCF',
      companyName: 'Công ty Cổ phần Thực phẩm Bích Chi',
      exchange: 'HNX',
      shortName: 'Thực phẩm Bích Chi',
      companyNameEn: 'Bich Chi Food Company'
    },
    {
      code: 'TEL',
      companyName: 'Công ty Cổ phần Phát triển Công trình Viễn thông',
      exchange: 'UPCOM',
      shortName: 'C.trình V.thông',
      companyNameEn: 'Telecommunication Project Construction Development Joint Stock Company'
    },
    {
      code: 'CPA',
      companyName: 'Công ty Cổ phần Cà phê Phước An',
      exchange: 'UPCOM',
      shortName: 'Cà phê Phước An',
      companyNameEn: 'Phuoc An Coffee Joint Stock Company'
    },
    {
      code: 'ABR',
      companyName: 'Công ty Cổ phần Đầu tư Nhãn hiệu Việt',
      exchange: 'UPCOM',
      shortName: 'ĐT Nhãn Hiệu Việt',
      companyNameEn: 'Viet Brand Invest Joint Stock Company'
    },
    {
      code: 'CIP',
      companyName: 'Công ty Cổ phần Xây lắp và Sản xuất công nghiệp',
      exchange: 'UPCOM',
      shortName: 'S.xuất C.nghiệp',
      companyNameEn: 'Construction and Industrial Production Joint Stock Company'
    },
    {
      code: 'PTO',
      companyName: 'Công ty Cổ phần Dịch vụ - Xây dựng Công trình Bưu điện',
      exchange: 'UPCOM',
      shortName: 'XD C.trình Bưu Điện',
      companyNameEn: 'Post and Telecommunication Services Construction Work Joint Stock Company'
    },
    {
      code: 'TCJ',
      companyName: 'Công ty Cổ phần Tô Châu',
      exchange: 'UPCOM',
      shortName: 'CTCP Tô Châu',
      companyNameEn: 'Tochau Joint Stock Company'
    },
    {
      code: 'TDG',
      companyName: 'Công ty Cổ phần Dầu khí Thái Dương',
      exchange: 'HOSE',
      shortName: 'Dầu khí Thái Dương',
      companyNameEn: 'Thaiduong Petrol Joint stock company'
    },
    {
      code: 'THI',
      companyName: 'Công ty Cổ phần Thiết bị điện',
      exchange: 'HOSE',
      shortName: 'CTCP Thiết bị điện',
      companyNameEn: 'Electrical Equipment Joint stock company'
    },
    {
      code: 'LWS',
      companyName: 'Công ty cổ phần Cấp nước tỉnh Lào Cai',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Lào Cai',
      companyNameEn: 'Lao Cai Water Supply Joint Stock Company'
    },
    {
      code: 'DHB',
      companyName: 'Công ty Cổ phần Phân đạm và Hóa chất Hà Bắc',
      exchange: 'UPCOM',
      shortName: 'Đạm Hà Bắc',
      companyNameEn: 'Habac Nitrogenous Fertilizer & Chemicals Joint Stock Company'
    },
    {
      code: 'KSE',
      companyName: 'Công ty cổ phần Xuất khẩu Thủy sản Khánh Hòa',
      exchange: 'UPCOM',
      shortName: 'XNK Th.sản Kh.Hòa',
      companyNameEn: 'Khanh Hoa Seafoods Exporting Joint Stock Company'
    },
    {
      code: 'YTC',
      companyName: 'Công ty Cổ phần Xuất nhập khẩu Y tế Thành phố Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'XNK Y tế TPHCM',
      companyNameEn: 'Ho Chi Minh City Medial Improt export Joint Stock Company'
    },
    {
      code: 'DSS',
      companyName: 'Công ty Cổ phần Đường sắt Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Đ.sắt Sài Gòn',
      companyNameEn: 'Sai Gon Railway Joint Stock Company'
    },
    {
      code: 'THU',
      companyName: 'Công ty Cổ phần Môi trường và Công trình đô thị Thanh Hóa',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị Th.Hóa',
      companyNameEn: 'Thanh Hoa Urban Construction and Environment Joint Stock Company'
    },
    {
      code: 'BMD',
      companyName: 'Công ty Cổ phần Môi trường và Dịch vụ Đô thị Bình Thuận',
      exchange: 'UPCOM',
      shortName: 'Đ.thị Bình Thuận',
      companyNameEn: 'Binh Thuan Environmental Urban Service Joint stock company'
    },
    {
      code: 'CEE',
      companyName: 'Công ty Cổ phần Xây dựng Hạ tầng CII',
      exchange: 'HOSE',
      shortName: 'XD Hạ tầng CII',
      companyNameEn: 'CII Engineering and Construction JSC'
    },
    {
      code: 'DAR',
      companyName: 'Công ty Cổ phần Xe lửa Dĩ An',
      exchange: 'UPCOM',
      shortName: 'CTCP Xe lửa Dĩ An',
      companyNameEn: 'Dian Train Joint stock company'
    },
    {
      code: 'MPY',
      companyName: 'Công ty Cổ phần Môi trường đô thị Phú Yên',
      exchange: 'UPCOM',
      shortName: 'Đô thị Phú Yên',
      companyNameEn: 'Phu Yen Town Environment Joint stock company'
    },
    {
      code: 'SAL',
      companyName: 'Công ty cổ phần Trục vớt cứu hộ Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Cứu hộ Việt Nam',
      companyNameEn: 'Viet Nam Salvage Joint Stock Company'
    },
    {
      code: 'T12',
      companyName: 'Công ty Cổ phần Thương mại Dịch vụ Tràng Thi',
      exchange: 'UPCOM',
      shortName: 'T.mại DV Tràng Thi',
      companyNameEn: 'Trang Thi Commercial and Services Joint Stock Company'
    },
    {
      code: 'BLT',
      companyName: 'Công ty Cổ phần Lương thực Bình Định',
      exchange: 'UPCOM',
      shortName: 'L.thực Bình Định',
      companyNameEn: 'Binh Dinh Food Joint stock company'
    },
    {
      code: 'BSL',
      companyName: 'Công ty Cổ phần Bia Sài Gòn - Sông Lam',
      exchange: 'UPCOM',
      shortName: 'Bia SG Sông Lam',
      companyNameEn: 'Saigon-Songlam Beer Joint stock company'
    },
    {
      code: 'CBS',
      companyName: 'Công ty Cổ phần Mía đường Cao Bằng',
      exchange: 'UPCOM',
      shortName: 'Mía đường Cao Bằng',
      companyNameEn: 'Cao Bang Sugar Joint Stock Company'
    },
    {
      code: 'CTF',
      companyName: 'Công ty Cổ phần City Auto',
      exchange: 'HOSE',
      shortName: 'CTCP City Auto',
      companyNameEn: 'City Auto Corporation'
    },
    {
      code: 'CVH',
      companyName: 'Công ty Cổ phần Công viên, Cây xanh Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Cây xanh Hải Phòng',
      companyNameEn: 'Hai Phong Green Park Joint stock company'
    },
    {
      code: 'EMS',
      companyName: 'Tổng Công ty Chuyển phát nhanh Bưu điện – Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'Chuyển phát Bưu điện',
      companyNameEn: 'VN Post Express Joint Stock Corporation'
    },
    {
      code: 'EVG',
      companyName: 'Công ty cổ phần Tập đoàn Everland',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Everland',
      companyNameEn: 'Everland group joint stock company'
    },
    {
      code: 'GKM',
      companyName: 'Công ty cổ phần Khang Minh Group',
      exchange: 'HNX',
      shortName: 'Khang Minh Group',
      companyNameEn: 'Khang Minh Group Joint Stock Company'
    },
    {
      code: 'HD6',
      companyName: 'Công ty Cổ phần đầu tư và phát triển Nhà số 6 Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Nhà số 6 Hà Nội',
      companyNameEn: 'Hanoi Housing Development and Investment Joint Stock Company No 6'
    },
    {
      code: 'HLS',
      companyName: 'Công ty Cổ phần Sứ kỹ thuật Hoàng Liên Sơn',
      exchange: 'UPCOM',
      shortName: 'Sứ Hoàng Liên Sơn',
      companyNameEn: 'Hoang Lien Son Technical Ceramics Joint Stock Company'
    },
    {
      code: 'NHT',
      companyName: 'Công ty Cổ phần Sản xuất và Thương mại Nam Hoa',
      exchange: 'UPCOM',
      shortName: 'SX & T.mại Nam Hoa',
      companyNameEn: 'Nam Hoa Trading and Production Corporation'
    },
    {
      code: 'NHV',
      companyName: 'Công ty Cổ phần Đầu tư NHV',
      exchange: 'UPCOM',
      shortName: 'Đầu tư NHV',
      companyNameEn: 'NHV Investment Joint Stock Company'
    },
    {
      code: 'PWS',
      companyName: 'Công ty Cổ phần Cấp thoát nước Phú Yên',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc Phú Yên',
      companyNameEn: 'Phu Yen Water Supply and Sewerage Joint Stock Company'
    },
    {
      code: 'RGC',
      companyName: 'Công ty Cổ phần Đầu tư PV-Inconess',
      exchange: 'UPCOM',
      shortName: 'Đ.tư PV-Inconess',
      companyNameEn: 'PV - Inconess Investment Joint Stock Company'
    },
    {
      code: 'SJF',
      companyName: 'Công Ty Cổ phần Đầu tư Sao Thái Dương',
      exchange: 'HOSE',
      shortName: 'ĐT Sao Thái Dương',
      companyNameEn: 'Sunstar Investment Joint Stock Company'
    },
    {
      code: 'VLP',
      companyName: 'Công ty Cổ phần Công trình Công cộng Vĩnh Long',
      exchange: 'UPCOM',
      shortName: 'C.trình Vĩnh Long',
      companyNameEn: 'Vinh Long Public Works Joint Stock Company'
    },
    {
      code: 'TCD',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Công nghiệp và Vận tải',
      exchange: 'HOSE',
      shortName: 'Đ.tư CN & Vận tải',
      companyNameEn: 'Transport and Industry Development Investment Joint stock company'
    },
    {
      code: 'VAV',
      companyName: 'Công ty cổ phần VIWACO',
      exchange: 'UPCOM',
      shortName: 'VIWACO',
      companyNameEn: 'VIWACO Joint Stock Company'
    },
    {
      code: 'TCW',
      companyName: 'Công ty Cổ phần Kho vận Tân Cảng',
      exchange: 'UPCOM',
      shortName: 'Kho vận Tân Cảng',
      companyNameEn: 'Tan Cang Warehousing Joint stock company'
    },
    {
      code: 'THN',
      companyName: 'Công ty cổ phần Cấp nước Thanh Hóa',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Thanh Hóa',
      companyNameEn: 'Thanh Hoa Water Supply Joint Stock Company'
    },
    {
      code: 'TNW',
      companyName: 'Công ty Cổ phần Nước sạch Thái Nguyên',
      exchange: 'UPCOM',
      shortName: 'Nước Thái Nguyên',
      companyNameEn: 'Thai Nguyen Water Joint stock company'
    },
    {
      code: 'TSD',
      companyName: 'Công ty Cổ phần Du lịch Trường Sơn Coecco',
      exchange: 'UPCOM',
      shortName: 'Trường Sơn Coecco',
      companyNameEn: 'TruongSon Tourism Joint Stock Company Coecco'
    },
    {
      code: 'APH',
      companyName: 'Công ty cổ phần Tập đoàn An Phát Holdings',
      exchange: 'HOSE',
      shortName: 'An Phát Holdings',
      companyNameEn: 'An Phat Holdings Joint Stock Company'
    },
    {
      code: 'FRM',
      companyName: 'Công ty Cổ phần Lâm nghiệp Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Lâm nghiệp Sài Gòn',
      companyNameEn: 'Saigon Forestry Import - Export Jointstock Company'
    },
    {
      code: 'HAM',
      companyName: 'Công ty Cổ phần Vật tư Hậu Giang',
      exchange: 'UPCOM',
      shortName: 'Vật tư Hậu Giang',
      companyNameEn: 'Hau Giang Materials Joint Stock Company'
    },
    {
      code: 'VHD',
      companyName: 'Công ty Cổ phần Đầu tư phát triển Nhà và Đô thị Vinaconex',
      exchange: 'UPCOM',
      shortName: 'Đô thị Vinaconex',
      companyNameEn: 'Vinaconex Urban and Housing Development Investment Joint Stock Company'
    },
    {
      code: 'LNC',
      companyName: 'Công ty cổ phần Lệ Ninh',
      exchange: 'UPCOM',
      shortName: 'CTCP Lệ Ninh',
      companyNameEn: 'LENINH JOINT STOCK COMPANY'
    },
    {
      code: 'CIA',
      companyName: 'Công ty Cổ phần Dịch vụ Sân bay Quốc tế Cam Ranh',
      exchange: 'HNX',
      shortName: 'DV S.bay Cam Ranh',
      companyNameEn: 'Cam Ranh International Airport Services Joint Stock Company'
    },
    {
      code: 'HII',
      companyName: 'Công ty Cổ phần An Tiến Industries',
      exchange: 'HOSE',
      shortName: 'An Tiến Industries',
      companyNameEn: 'AnTien Industries Joint Stock Company'
    },
    {
      code: 'AAV',
      companyName: 'Công ty cổ phần Việt Tiên Sơn Địa ốc',
      exchange: 'HNX',
      shortName: 'Việt Tiên Sơn Địa ốc',
      companyNameEn: 'Viet Tien Son Real Estate Holding Company'
    },
    {
      code: 'CAG',
      companyName: 'Công ty Cổ phần Cảng An Giang',
      exchange: 'HNX',
      shortName: 'Cảng An Giang',
      companyNameEn: 'An Giang Port Joint Stock Company'
    },
    {
      code: 'CRC',
      companyName: 'Công ty Cổ phần Create Capital Việt Nam',
      exchange: 'HOSE',
      shortName: 'Create Capital VN',
      companyNameEn: 'Create Capital Vietnam Joint Stock Company Limited'
    },
    {
      code: 'HTE',
      companyName: 'Công ty Cổ phần Đầu tư Kinh doanh điện lực Thành phố Hồ Chí Minh',
      exchange: 'UPCOM',
      shortName: 'Điện lực HCM',
      companyNameEn: 'Ho Chi Minh City Electric Power Trading Investment Corporation'
    },
    {
      code: 'MND',
      companyName: 'Công ty Cổ phần Môi trường Nam Định',
      exchange: 'UPCOM',
      shortName: 'M.trường Nam Định',
      companyNameEn: 'Nam Dinh Environment Joint Stock Company'
    },
    {
      code: 'NBE',
      companyName: 'Công ty Cổ phần Sách và Thiết bị giáo dục miền Bắc',
      exchange: 'UPCOM',
      shortName: 'Sách T.bị M.Bắc',
      companyNameEn: 'North Books And Educational Equipment Joint Stock Company'
    },
    {
      code: 'EME',
      companyName: 'Công ty Cổ phần Điện Cơ',
      exchange: 'UPCOM',
      shortName: 'CTCP Điện Cơ',
      companyNameEn: 'Electro Mechanical Corporation'
    },
    {
      code: 'NSH',
      companyName: 'Công ty Cổ phần Nhôm Sông Hồng',
      exchange: 'HNX',
      shortName: 'Nhôm Sông Hồng',
      companyNameEn: 'Song Hong Aluminium Joint Stock Company'
    },
    {
      code: 'TOT',
      companyName: 'Công ty cổ phần Vận tải Transimex',
      exchange: 'UPCOM',
      shortName: 'Vận tải Transimex',
      companyNameEn: 'Transimex Transportation Joint Stock Company'
    },
    {
      code: 'TDB',
      companyName: 'Công ty cổ phần Thủy điện Định Bình',
      exchange: 'UPCOM',
      shortName: 'Th.điện Định Bình',
      companyNameEn: 'Dinh Binh Hydro Power Joint Stock Company'
    },
    {
      code: 'DNN',
      companyName: 'Công ty Cổ phần Cấp nước Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Đà Nẵng',
      companyNameEn: 'Da Nang Water Supply Joint Stock Company'
    },
    {
      code: 'HAF',
      companyName: 'Công ty cổ phần Thực phẩm Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Thực phẩm Hà Nội',
      companyNameEn: 'Hanoi Foodstuff Joint Stock Company'
    },
    {
      code: 'BHA',
      companyName: 'Công ty Cổ phần Thủy điện Bắc Hà',
      exchange: 'UPCOM',
      shortName: 'Th.điện Bắc Hà',
      companyNameEn: 'Bac Ha Hydropower Joint Stock Company'
    },
    {
      code: 'HPU',
      companyName: 'Công ty Cổ phần 28 Hưng Phú',
      exchange: 'UPCOM',
      shortName: 'CTCP 28 Hưng Phú',
      companyNameEn: '28 Hung Phu Joint Stock Company'
    },
    {
      code: 'NTF',
      companyName: 'Công ty cổ phần Dược - Vật tư Y tế Nghệ An',
      exchange: 'UPCOM',
      shortName: 'Y tế Nghệ An',
      companyNameEn: 'Nghe An Pharmaceutical Medical Materical and Equipment Joint Stock Company'
    },
    {
      code: 'PCM',
      companyName: 'Công ty Cổ phần Vật liệu xây dựng Bưu Điện',
      exchange: 'UPCOM',
      shortName: 'VLXD Bưu điện',
      companyNameEn: 'Post And Telecommucation Construction Material Joint Stock Company'
    },
    {
      code: 'LTG',
      companyName: 'Công ty Cổ phần Tập đoàn Lộc Trời',
      exchange: 'UPCOM',
      shortName: 'Tập đoàn Lộc Trời',
      companyNameEn: 'Loc Troi Group Joint Stock Company'
    },
    {
      code: 'MGG',
      companyName: 'Tổng công ty Đức Giang - Công ty cổ phần',
      exchange: 'UPCOM',
      shortName: 'Công ty Đức Giang',
      companyNameEn: 'Duc Giang Corporation'
    },
    {
      code: 'JOS',
      companyName: 'Công ty cổ phần Chế biến Thủy sản Xuất khẩu Minh Hải',
      exchange: 'UPCOM',
      shortName: 'Th.sản XK Minh Hải',
      companyNameEn: 'Minh Hai Export Frozen Seafood Processing Joint – Stock Company'
    },
    {
      code: 'NAW',
      companyName: 'Công ty Cổ phần Cấp nước Nghệ An',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Nghệ An',
      companyNameEn: 'Nghe An Water Supply Joint Stock Company'
    },
    {
      code: 'DS3',
      companyName: 'Công ty Cổ phần Quản lý Đường sông số 3',
      exchange: 'HNX',
      shortName: 'Đường sông số 3',
      companyNameEn: 'Inland Waterway Management Joint Stock Company N0 3'
    },
    {
      code: 'UMC',
      companyName: 'Công ty Cổ phần Công trình đô thị Nam Định',
      exchange: 'UPCOM',
      shortName: 'Đô thị Nam Định',
      companyNameEn: 'Nam Dinh Urban Construction Management Joint Stock Company'
    },
    {
      code: 'LBC',
      companyName: 'Công ty cổ phần Thương mại - Đầu tư Long Biên',
      exchange: 'UPCOM',
      shortName: 'Đầu tư Long Biên',
      companyNameEn: 'Long Bien Joint Stock Company'
    },
    {
      code: 'NED',
      companyName: 'Công ty cổ phần Đầu tư và Phát triển Điện Tây Bắc',
      exchange: 'UPCOM',
      shortName: 'Điện Tây Bắc',
      companyNameEn: 'North-West Electric Investment And Development Joint Stock Company'
    },
    {
      code: 'SKH',
      companyName: 'Công ty Cổ phần Nước giải khát Sanest Khánh Hòa',
      exchange: 'UPCOM',
      shortName: 'Sanest Khánh Hòa',
      companyNameEn: 'Khanh Hoa Sanest Soft Drink Joint Stock Company'
    },
    {
      code: 'PLP',
      companyName: 'Công ty cổ phần Sản xuất và Công nghệ Nhựa Pha Lê',
      exchange: 'HOSE',
      shortName: 'Nhựa Pha Lê',
      companyNameEn: 'Pha Le Plastics Manufacturing and Technology Joint Stock Company'
    },
    {
      code: 'MEL',
      companyName: 'Công ty Cổ phần Thép Mê Lin',
      exchange: 'HNX',
      shortName: 'Thép Mê Lin',
      companyNameEn: 'Me Lin Steel Joint Stock Company'
    },
    {
      code: 'SVL',
      companyName: 'Công ty cổ phần Nhân lực Quốc tế Sovilaco',
      exchange: 'UPCOM',
      shortName: 'Nhân lực Sovilaco',
      companyNameEn: 'Sovilaco International Manpower Joint Stock Company'
    },
    {
      code: 'SBM',
      companyName: 'Công ty cổ phần Đầu tư Phát triển Bắc Minh',
      exchange: 'UPCOM',
      shortName: 'ĐTPT Bắc Minh',
      companyNameEn: 'Bac Minh Development Investment Joint Stock Company'
    },
    {
      code: 'FT1',
      companyName: 'Công ty cổ phần Phụ tùng máy số 1',
      exchange: 'UPCOM',
      shortName: 'Phụ tùng máy số 1',
      companyNameEn: 'Machinery Spare Parts N01 Joint Stock Company'
    },
    {
      code: 'ATD',
      companyName: 'Công ty Cổ phần 28 Đà Nẵng',
      exchange: 'UPCOM',
      shortName: 'CTCP 28 Đà Nẵng',
      companyNameEn: '28 DA NANG JOINT STOCK COMPANY'
    },
    {
      code: 'CBI',
      companyName: 'Công ty Cổ phần Gang thép Cao Bằng',
      exchange: 'UPCOM',
      shortName: 'Gang thép Cao Bằng',
      companyNameEn: 'Cao Bang Iron And Steel Joint Stock Company'
    },
    {
      code: 'DP1',
      companyName: 'Công ty Cổ phần Dược phẩm Trung ương CPC1',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm TW CPC1',
      companyNameEn: 'Central Pharmaceutical CPC1. JSC'
    },
    {
      code: 'FBC',
      companyName: 'Công ty Cổ phần Cơ khí Phổ Yên',
      exchange: 'UPCOM',
      shortName: 'Cơ khí Phổ Yên',
      companyNameEn: 'Pho Yen Mechanical Joint Stock Company'
    },
    {
      code: 'FTI',
      companyName: 'Công ty Cổ phần Công nghiệp - Thương mại Hữu Nghị',
      exchange: 'UPCOM',
      shortName: 'T.mại Hữu Nghị',
      companyNameEn: 'Friendship Trading - Industrial Joint Stock Company'
    },
    {
      code: 'HNA',
      companyName: 'Công ty cổ phần Thủy điện Hủa Na',
      exchange: 'UPCOM',
      shortName: 'Th.điện Hủa Na',
      companyNameEn: 'Hua Na Hydropower Joint Stock Company'
    },
    {
      code: 'MQB',
      companyName: 'Công ty Cổ phần Môi trường và Phát triển đô thị Quảng Bình',
      exchange: 'UPCOM',
      shortName: 'Đô thị Quảng Bình',
      companyNameEn: 'Quang Binh Environment and Urban Development Joint Stock Company'
    },
    {
      code: 'POB',
      companyName: 'Công ty Cổ phần Xăng dầu Dầu khí Thái Bình',
      exchange: 'UPCOM',
      shortName: 'Dầu khí Thái Bình',
      companyNameEn: 'Thai Binh Petrovietnam Oil Joint Stock Company'
    },
    {
      code: 'SCY',
      companyName: 'Công ty Cổ phần Đóng tàu Sông Cấm',
      exchange: 'UPCOM',
      shortName: 'Đóng tàu Sông Cấm',
      companyNameEn: 'Song Cam Shipbuilding Joint Stock Company'
    },
    {
      code: 'SUM',
      companyName: 'Công ty cổ phần Đo đạc và Khoáng sản',
      exchange: 'UPCOM',
      shortName: 'Đo đạc & K.sản',
      companyNameEn: 'Survey and Minerals Joint Stock Company'
    },
    {
      code: 'VPG',
      companyName: 'Công ty cổ phần Đầu tư Thương mại Xuất nhập khẩu Việt Phát',
      exchange: 'HOSE',
      shortName: 'XNK Việt Phát',
      companyNameEn: 'Viet Phat Import Export Trading Investment Joint Stock Company'
    },
    {
      code: 'VPW',
      companyName: 'Công ty Cổ phần Cấp thoát nước số 1 Vĩnh Phúc',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc 1 V.Phúc',
      companyNameEn: 'Vinh Phuc Water Supply and Drainage Joint Stock Company No.1'
    },
    {
      code: 'TS3',
      companyName: 'Công ty TNHH Một Thành viên 532',
      exchange: 'UPCOM',
      shortName: 'TNHH MTV 532',
      companyNameEn: '532 One Member Limited Liability Company'
    },
    {
      code: 'DTD',
      companyName: 'Công ty Cổ phần Đầu tư Phát triển Thành Đạt',
      exchange: 'HNX',
      shortName: 'ĐTPT Thành Đạt',
      companyNameEn: 'Thanh Dat Investment Development Joint Stock Company'
    },
    {
      code: 'HAB',
      companyName: 'Công ty Cổ phần Sách và Thiết bị trường học Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Sách T.bị Hà Nội',
      companyNameEn: 'Hanoi School Books and Equipment Joint Stock Company'
    },
    {
      code: 'HC1',
      companyName: 'Công ty Cổ phần Xây dựng số 1 Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Xây dựng số 1 Hà Nội',
      companyNameEn: 'Hanoi Construction Joint Stock Company No.1'
    },
    {
      code: 'HDW',
      companyName: 'Công ty Cổ phần Kinh doanh Nước sạch Hải Dương',
      exchange: 'UPCOM',
      shortName: 'Nước Hải Dương',
      companyNameEn: 'Hai Duong Water Joint Stock Company'
    },
    {
      code: 'LG9',
      companyName: 'Công ty Cổ phần Cơ giới và Xây lắp số 9',
      exchange: 'UPCOM',
      shortName: 'Xây lắp số 9',
      companyNameEn: 'Mechanized Construction And Installation Joint Stock Company'
    },
    {
      code: 'QLD',
      companyName: 'Công ty cổ phần Quản lý và Xây dựng Giao thông Lạng Sơn',
      exchange: 'UPCOM',
      shortName: 'XD GT Lạng Sơn',
      companyNameEn: 'Lang Son Road Manegement and Contruction Joint Stock Company'
    },
    {
      code: 'TS5',
      companyName: 'Công ty cổ phần Trường Sơn 145',
      exchange: 'UPCOM',
      shortName: 'Trường Sơn 145',
      companyNameEn: 'Truong Son 145 Joint Stock Company'
    },
    {
      code: 'BTN',
      companyName: 'Công ty cổ phần Gạch Tuy Nen Bình Định',
      exchange: 'UPCOM',
      shortName: 'Gạch Tuy Nen',
      companyNameEn: 'Binh Dinh Tunnel Brick Joint Stock Company'
    },
    {
      code: 'HAV',
      companyName: 'Công ty Cổ phần Rượu Hapro',
      exchange: 'UPCOM',
      shortName: 'CTCP Rượu Hapro',
      companyNameEn: 'Hapro Vodka Joint Stock Company'
    },
    {
      code: 'HEP',
      companyName: 'Công ty cổ phần Môi trường và Công trình đô thị Huế',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị Huế',
      companyNameEn: 'Hue Urban Environment and Public Works Joint Stock Company'
    },
    {
      code: 'KOS',
      companyName: 'Công ty cổ phần Kosy',
      exchange: 'HOSE',
      shortName: 'CTCP Kosy',
      companyNameEn: 'Kosy Joint Stock Company'
    },
    {
      code: 'SKV',
      companyName: 'Công ty Cổ phần Nước Giải khát Yến sào Khánh Hòa',
      exchange: 'UPCOM',
      shortName: 'Nc g.khát Yến sào',
      companyNameEn: 'Khanh Hoa Salanganes Nest Soft Drink Joint Stock Company'
    },
    {
      code: 'TLD',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Phát triển Đô thị Thăng Long',
      exchange: 'HOSE',
      shortName: 'Đô thị Thăng Long',
      companyNameEn: 'Thang Long Urban Development And Construction Investment Join Stock Company'
    },
    {
      code: 'VXP',
      companyName: 'CÔNG TY CỔ PHẦN THUỐC THÚ Y TRUNG ƯƠNG VETVACO',
      exchange: 'UPCOM',
      shortName: 'Thuốc thú y Trung ương',
      companyNameEn: 'VETVACO NATIONAL VETERINARY JOINT STOCK COMPANY'
    },
    {
      code: 'BGW',
      companyName: 'Công ty Cổ phần Nước sạch Bắc Giang',
      exchange: 'UPCOM',
      shortName: 'Nước Bắc Giang',
      companyNameEn: 'Bac Giang Clean Water Joint Stock Company'
    },
    {
      code: 'VRE',
      companyName: 'Công ty Cổ phần Vincom Retail',
      exchange: 'HOSE',
      shortName: 'Vincom Retail',
      companyNameEn: 'Vincom Retail Joint Stock Company'
    },
    {
      code: 'PMW',
      companyName: 'Công ty cổ phần Cấp nước Phú Mỹ',
      exchange: 'UPCOM',
      shortName: 'Cấp nước Phú Mỹ',
      companyNameEn: 'Phu My Water Supply Joint Stock Company'
    },
    {
      code: 'HRB',
      companyName: 'Công ty cổ phần Harec Đầu tư và Thương Mại',
      exchange: 'UPCOM',
      shortName: 'Harec Đ.tư & T.mại',
      companyNameEn: 'Harec Investment anh Trade Joint Stock Company'
    },
    {
      code: 'BPW',
      companyName: 'Công ty Cổ phần Cấp thoát nước Bình Phước',
      exchange: 'UPCOM',
      shortName: 'C.thoát nc B.Phước',
      companyNameEn: 'Binh Phuoc Water Supply and Sewerage Joint Stock Company'
    },
    {
      code: 'HNI',
      companyName: 'Công ty Cổ phần May Hữu Nghị',
      exchange: 'UPCOM',
      shortName: 'May Hữu Nghị',
      companyNameEn: 'Huu Nghi Garment Joint Stock Company'
    },
    {
      code: 'HUB',
      companyName: 'Công ty Cổ phần Xây lắp Thừa Thiên Huế',
      exchange: 'HOSE',
      shortName: 'X.lắp Thừa Thiên Huế',
      companyNameEn: 'Thua Thien Hue Construction Joint Stock Corporation'
    },
    {
      code: 'HLE',
      companyName: 'Công ty cổ phần Điện chiếu sáng Hải Phòng',
      exchange: 'UPCOM',
      shortName: 'Chiếu sáng H.Phòng',
      companyNameEn: 'Hai Phong Electric Lighting Joint Stock Company'
    },
    {
      code: 'IRC',
      companyName: 'Công ty cổ phần Cao su Công nghiệp',
      exchange: 'UPCOM',
      shortName: 'Cao su Công nghiệp',
      companyNameEn: 'Industrial Rubber Company, Limited'
    },
    {
      code: 'PLA',
      companyName: 'Công ty cổ phần Đầu tư và Dịch vụ Hạ tầng Xăng Dầu',
      exchange: 'UPCOM',
      shortName: 'Hạ tầng Xăng Dầu',
      companyNameEn: 'Petroleum Logistic Service and Investment Joint Stock Company'
    },
    {
      code: 'VPI',
      companyName: 'Công ty Cổ phần Đầu tư Văn Phú - Invest',
      exchange: 'HOSE',
      shortName: 'Đầu tư Văn Phú',
      companyNameEn: 'Van Phu - Invest Investment Joint Stock Company'
    },
    {
      code: 'ILA',
      companyName: 'Công ty Cổ phần ILA',
      exchange: 'UPCOM',
      shortName: 'CTCP ILA',
      companyNameEn: 'ILA Joint Stock Company'
    },
    {
      code: 'TA6',
      companyName: 'Công ty cổ phần Đầu tư và Xây lắp Thành An 665',
      exchange: 'UPCOM',
      shortName: 'X.lắp Thành An 665',
      companyNameEn: 'Thanh An 665 Investment, Installation and Construction Joint Stock Company'
    },
    {
      code: 'ASG',
      companyName: 'Công ty Cổ phần Tập đoàn ASG',
      exchange: 'HOSE',
      shortName: 'Tập đoàn ASG',
      companyNameEn: 'ASG CORPORATION'
    },
    {
      code: 'VET',
      companyName: 'Công ty Cổ phần Thuốc Thú y Trung ương NAVETCO',
      exchange: 'UPCOM',
      shortName: 'Thuốc Thú Y NAVETCO',
      companyNameEn: 'NAVETCO National Veterinary Joint Stock Company'
    },
    {
      code: 'DCH',
      companyName: 'Công ty Cổ phần Địa chính Hà Nội',
      exchange: 'UPCOM',
      shortName: 'HCSC',
      companyNameEn: 'Hanoi Cadastral Survey Joint Stock Company'
    },
    {
      code: 'BHK',
      companyName: 'Công ty cổ phần Bia Hà Nội - Kim Bài',
      exchange: 'UPCOM',
      shortName: 'Bia HN Kim Bài',
      companyNameEn: 'Ha Noi Kim Bai Beer Joint Stock Company'
    },
    {
      code: 'EPH',
      companyName: 'Công ty cổ phần Dịch vụ Xuất bản Giáo dục Hà Nội',
      exchange: 'UPCOM',
      shortName: 'X.bản Giáo dục HN',
      companyNameEn: 'Hanoi Education Publishing Services Joint Stock Company'
    },
    {
      code: 'FHN',
      companyName: 'Công ty cổ phần Xuất nhập khẩu Lương thực - Thực phẩm Hà Nội',
      exchange: 'UPCOM',
      shortName: 'XNK Th.phẩm HN',
      companyNameEn: 'Hanoi Food Import – Export Joint Stock Company'
    },
    {
      code: 'HFS',
      companyName: 'Công ty cổ phần Thương mại Dịch vụ Thời trang Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Hafasco',
      companyNameEn: 'Ha Noi Trading Service Fashion Joint Stock Company'
    },
    {
      code: 'HPH',
      companyName: 'Công ty Cổ phần Hóa chất Hưng Phát Hà Bắc',
      exchange: 'UPCOM',
      shortName: 'Hóa chất Hưng Phát',
      companyNameEn: 'Ha Bac Hung Phat Chemical Joint Stock Company'
    },
    {
      code: 'KHS',
      companyName: 'Công ty Cổ phần Kiên Hùng',
      exchange: 'HNX',
      shortName: 'CTCP Kiên Hùng',
      companyNameEn: 'Kien Hung Joint Stock Company'
    },
    {
      code: 'NRC',
      companyName: 'Công ty Cổ phần Tập đoàn Danh Khôi',
      exchange: 'HNX',
      shortName: 'Tập đoàn Danh Khôi',
      companyNameEn: 'Danh Khoi Group Joint Stock'
    },
    {
      code: 'SON',
      companyName: 'Công ty cổ phần Cung ứng Nhân lực Quốc tế và Thương mại',
      exchange: 'UPCOM',
      shortName: 'Nhân lực Quốc tế',
      companyNameEn: 'International Manpower Supply and Trade Joint Stock Company'
    },
    {
      code: 'SVH',
      companyName: 'Công ty cổ phần Thủy điện Sông Vàng',
      exchange: 'UPCOM',
      shortName: 'Th.điện Sông Vàng',
      companyNameEn: 'Song Vang HydroPower Joint Stock Company'
    },
    {
      code: 'AST',
      companyName: 'Công ty Cổ phần Dịch vụ Hàng không Taseco',
      exchange: 'HOSE',
      shortName: 'DV Hg không Taseco',
      companyNameEn: 'Taseco Air Services Joint Stock Company'
    },
    {
      code: 'BBM',
      companyName: 'Công ty Cổ phần Bia Hà Nội - Nam Định',
      exchange: 'UPCOM',
      shortName: 'Bia HN Nam Định',
      companyNameEn: 'Ha Noi - Nam Dinh Beer Joint Stock Company'
    },
    {
      code: 'BQB',
      companyName: 'Công ty Cổ phần Bia Hà Nội - Quảng Bình',
      exchange: 'UPCOM',
      shortName: 'Bia HN Quảng Bình',
      companyNameEn: 'HaNoi-QuangBinh Beer Joint Stock Company'
    },
    {
      code: 'DTI',
      companyName: 'Công ty Cổ phần Đầu tư Đức Trung',
      exchange: 'UPCOM',
      shortName: 'Đầu tư Đức Trung',
      companyNameEn: 'Duc Trung Investment Joint Stock Company'
    },
    {
      code: 'S72',
      companyName: 'Công ty cổ phần Sông Đà 7.02',
      exchange: 'UPCOM',
      shortName: 'CTCP Sông Đà 7.02',
      companyNameEn: 'Song Da 7.02 Hydroelectric Joint Stock Company'
    },
    {
      code: 'TA3',
      companyName: 'Công ty Cổ phần Đầu tư và Xây lắp Thành An 386',
      exchange: 'UPCOM',
      shortName: 'X.lắp Thành An 386',
      companyNameEn: '386 Thanh An Construction and Investment Joint Stock Company'
    },
    {
      code: 'PMG',
      companyName: 'Công ty Cổ phần Đầu tư và Sản xuất Petro Miền Trung',
      exchange: 'HOSE',
      shortName: 'Petro Miền Trung',
      companyNameEn: 'PETRO CENTER CORPORATION'
    },
    {
      code: 'BUD',
      companyName: 'Công ty Cổ phần Khoa học Công nghệ Việt Nam',
      exchange: 'UPCOM',
      shortName: 'Khoa học công nghệ Việt Nam',
      companyNameEn: 'Vietnam Sience and Technology Joint Stock Company'
    },
    {
      code: 'AG1',
      companyName: 'Công ty Cổ phần 28.1',
      exchange: 'UPCOM',
      shortName: 'CTCP 28.1',
      companyNameEn: '28.1 Joint Stock Company'
    },
    {
      code: 'BSA',
      companyName: 'Công ty cổ phần Thủy điện Buôn Đôn',
      exchange: 'UPCOM',
      shortName: 'Th.điện Buôn Đôn',
      companyNameEn: 'BUON DON HYDROPOWER JOINT STOCK COMPANY'
    },
    {
      code: 'MBN',
      companyName: 'Công ty cổ phần Môi trường và Công trình đô thị Bắc Ninh',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị B.Ninh',
      companyNameEn: 'Bac Ninh Urban Environment And Public Works Joint Stock Company'
    },
    {
      code: 'MDA',
      companyName: 'Công ty cổ phần Môi trường Đô thị Đông Anh',
      exchange: 'UPCOM',
      shortName: 'Đô thị Đông Anh',
      companyNameEn: 'Dong Anh Urban Environment Joints Stock Company'
    },
    {
      code: 'NAU',
      companyName: 'Công ty Cổ phần Môi trường và Công trình Đô thị Nghệ An',
      exchange: 'UPCOM',
      shortName: 'M.trg Đ.thị N.An',
      companyNameEn: 'Nghe An Urban Environment And Works Joint Stock Company'
    },
    {
      code: 'CDP',
      companyName: 'Công ty cổ phần Dược phẩm Trung ương Codupha',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm Codupha',
      companyNameEn: 'Codupha Central Pharmaceutical Joint Stock Company'
    },
    {
      code: 'HBW',
      companyName: 'Công ty cổ phần Nước sạch Hòa Bình',
      exchange: 'UPCOM',
      shortName: 'Nước Hòa Bình',
      companyNameEn: 'Hoa Binh Clear Water Joint Stock Company'
    },
    {
      code: 'PTX',
      companyName: 'Công ty cổ phần Vận tải và Dịch vụ Petrolimex Nghệ Tĩnh',
      exchange: 'UPCOM',
      shortName: 'V.tải Petro N.Tĩnh',
      companyNameEn: 'Petrolimex Nghe Tinh Transportation and Service Joint Stock Company'
    },
    {
      code: 'C22',
      companyName: 'Công ty Cổ phần 22',
      exchange: 'UPCOM',
      shortName: 'CTCP 22',
      companyNameEn: '22 Joint Stock Company'
    },
    {
      code: 'HSL',
      companyName: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN THỰC PHẨM HỒNG HÀ',
      exchange: 'HOSE',
      shortName: 'Thực phẩm Hồng Hà',
      companyNameEn: 'HONG HA FOOD INVESTMENT DEVELOPMENT JOINT STOCK COMPANY'
    },
    {
      code: 'HTN',
      companyName: 'Công ty cổ phần Hưng Thịnh Incons',
      exchange: 'HOSE',
      shortName: 'Hưng Thịnh Incons',
      companyNameEn: 'Hung Thinh Incons Joint Stock Company'
    },
    {
      code: 'VGR',
      companyName: 'Công ty cổ phần Cảng Xanh Vip',
      exchange: 'UPCOM',
      shortName: 'Cảng Xanh Vip',
      companyNameEn: 'Vip GreenPort Joint Stock Company'
    },
    {
      code: 'DM7',
      companyName: 'Công ty cổ phần Dệt May 7',
      exchange: 'UPCOM',
      shortName: 'Dệt May 7',
      companyNameEn: 'Det May 7 Joint Stock Company'
    },
    {
      code: 'BMF',
      companyName: 'Công ty Cổ phần Vật liệu xây dựng và Chất đốt Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'Chất đốt Đồng Nai',
      companyNameEn: 'Dong Nai Building Material and Fuel Joint Stock Company'
    },
    {
      code: 'DHN',
      companyName: 'Công ty Cổ phần Dược phẩm Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm Hà Nội',
      companyNameEn: 'Hanoi Pharma Joint Stock Company'
    },
    {
      code: 'TOW',
      companyName: 'Công ty cổ phần Cấp nước Trà Nóc - Ô Môn',
      exchange: 'UPCOM',
      shortName: 'Cấp nước Trà Nóc-Ô Môn',
      companyNameEn: 'TraNoc – Omon Water Supply Joint Stock Company'
    },
    {
      code: 'TDT',
      companyName: 'Công ty Cổ phần Đầu tư và Phát triển TDT',
      exchange: 'HNX',
      shortName: 'Đ.tư P.triển TDT',
      companyNameEn: 'TDT Investment and Development Joint Stock Company'
    },
    {
      code: 'VHI',
      companyName: 'Công ty Cổ phần Kinh doanh và Đầu tư Việt Hà',
      exchange: 'UPCOM',
      shortName: 'K.doanh Đầu tư Việt Hà',
      companyNameEn: 'VIETHA INVESTMENT AND TRADING JOINT STOCK COMPANY'
    },
    {
      code: 'VDM',
      companyName: 'Công ty cổ phần - Viện Nghiên cứu Dệt May',
      exchange: 'UPCOM',
      shortName: 'Viện Dệt May',
      companyNameEn: 'Textile Research Institute'
    },
    {
      code: 'CRE',
      companyName: 'Công ty Cổ phần Bất động sản Thế kỷ',
      exchange: 'HOSE',
      shortName: 'BĐS Thế kỷ',
      companyNameEn: 'Century Land Joint Stock Company'
    },
    {
      code: 'VHM',
      companyName: 'Công ty cổ phần Vinhomes',
      exchange: 'HOSE',
      shortName: 'VINHOMES',
      companyNameEn: 'Vinhomes Joint Stock Company'
    },
    {
      code: 'BKH',
      companyName: 'Công ty Cổ phần Bánh mứt kẹo Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Bánh mứt kẹo HN',
      companyNameEn: 'HaNoi Confectionery Joint Stock Company'
    },
    {
      code: 'HNR',
      companyName: 'Công ty Cổ phần Rượu và Nước giải khát Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Giải khát Hà Nội HALICO',
      companyNameEn: 'Hanoi Liquor and baverage Joint Stock Company'
    },
    {
      code: 'LMH',
      companyName: 'Công ty cổ phần Landmark Holding',
      exchange: 'UPCOM',
      shortName: 'Landmark Holding',
      companyNameEn: 'Landmark Holding Joint Stock Company'
    },
    {
      code: 'TGG',
      companyName: 'Công ty Cổ phần Xây dựng và Đầu tư Trường Giang',
      exchange: 'HOSE',
      shortName: 'Đ.tư Trường Giang',
      companyNameEn: 'Truong Giang Investment and Construction Joint Stock Company'
    },
    {
      code: 'NQN',
      companyName: 'Công ty Cổ phần Nước sạch Quảng Ninh',
      exchange: 'UPCOM',
      shortName: 'Nước Quảng Ninh',
      companyNameEn: 'Quang Ninh Clean Water Joint Stock Company'
    },
    {
      code: 'SBH',
      companyName: 'Công ty Cổ phần Thủy điện Sông Ba Hạ',
      exchange: 'UPCOM',
      shortName: 'T.điện Sông Ba Hạ',
      companyNameEn: 'Song Ba Ha Hydro Power Join Stock Company'
    },
    {
      code: 'YEG',
      companyName: 'Công ty cổ phần Tập đoàn Yeah1',
      exchange: 'HOSE',
      shortName: 'Tập đoàn Yeah1',
      companyNameEn: 'Yeah1 Group Corporation'
    },
    {
      code: 'HTK',
      companyName: 'Công ty cổ phần Đăng kiểm xe cơ giới Hải Dương',
      exchange: 'UPCOM',
      shortName: 'Đăng kiểm Hải Dương',
      companyNameEn: 'Hai Duong Motor Transport Vehicle Registration Joint Stock Company'
    },
    {
      code: 'BSH',
      companyName: 'Công ty Cổ phần Bia Sài Gòn - Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Bia Sài Gòn Hà Nội',
      companyNameEn: 'Sai Gon - Ha Noi Beer Corporation'
    },
    {
      code: 'DTP',
      companyName: 'Công ty cổ phần Dược phẩm CPC1 Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Dược phẩm CPC1 Hà Nội',
      companyNameEn: 'Ha Noi CPC1 Pharmaceutical Joint Stock Company'
    },
    {
      code: 'CEN',
      companyName: 'Công ty Cổ phần Dịch vụ Hàng Không Cencon Việt Nam',
      exchange: 'UPCOM',
      shortName: 'DV Hg Không Cencon',
      companyNameEn: 'Cencon Viet Nam Air Services Joint Stock Company'
    },
    {
      code: 'MQN',
      companyName: 'Công ty cổ phần Môi trường Đô thị Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'Đô thị Quảng Ngãi',
      companyNameEn: 'Quang Ngai Urban Environment Joint Stock Company'
    },
    {
      code: 'DX2',
      companyName: 'Công ty cổ phần Đầu tư và Xây dựng 319.2',
      exchange: 'UPCOM',
      shortName: 'Xây dựng 319.2',
      companyNameEn: '319.2 Investment And Construction Joint Stock Company'
    },
    {
      code: 'STW',
      companyName: 'Công ty cổ phần Cấp nước Sóc Trăng',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Sóc Trăng',
      companyNameEn: 'SOCTRANG WATER SUPPLY JOINT STOCK COMPANY'
    },
    {
      code: 'FGL',
      companyName: 'Công ty cổ phần Cà phê Gia Lai',
      exchange: 'UPCOM',
      shortName: 'Cà phê Gia Lai',
      companyNameEn: 'Gia Lai Coffee Joint Stock Company'
    },
    {
      code: 'BHG',
      companyName: 'Công ty cổ phần Chè Biển Hồ',
      exchange: 'UPCOM',
      shortName: 'Chè Biển Hồ',
      companyNameEn: 'Bien Ho Tea Joint Stock Company'
    },
    {
      code: 'A32',
      companyName: 'Công ty cổ phần 32',
      exchange: 'UPCOM',
      shortName: 'CTCP 32',
      companyNameEn: '32 Joint Stock Company'
    },
    {
      code: 'EVS',
      companyName: 'Công ty Cổ phần Chứng khoán Everest',
      exchange: 'HNX',
      shortName: 'CK Everest',
      companyNameEn: 'Everest Securities Joint Stock Company'
    },
    {
      code: 'EPC',
      companyName: 'Công ty cổ phần Cà Phê Ea Pốk',
      exchange: 'UPCOM',
      shortName: 'Cà phê Ea Pốk',
      companyNameEn: 'Ea Pok Coffee Joint Stock Company'
    },
    {
      code: 'HHP',
      companyName: 'Công ty cổ phần Giấy Hoàng Hà Hải Phòng',
      exchange: 'HOSE',
      shortName: 'Giấy Hoàng Hà HP',
      companyNameEn: 'Hai Phong Hoang Ha Paper Join Stock Company'
    },
    {
      code: 'DDG',
      companyName: 'Công ty cổ phần Đầu tư Công nghiệp Xuất nhập khẩu Đông Dương',
      exchange: 'HNX',
      shortName: 'XNK Đông Dương',
      companyNameEn: 'Indochine Import Export Industrial Investment Joint Stock Company'
    },
    {
      code: 'YBM',
      companyName: 'Công ty cổ phần Khoáng sản công nghiệp Yên Bái',
      exchange: 'HOSE',
      shortName: 'K.sản CN Yên Bái',
      companyNameEn: 'Yen Bai Industry Mineral Joint Stock Company'
    },
    {
      code: 'CKA',
      companyName: 'Công ty cổ phần Cơ Khí An Giang',
      exchange: 'UPCOM',
      shortName: 'Cơ khí An Giang',
      companyNameEn: 'An Giang Mechanical Joint Stock Company'
    },
    {
      code: 'TKA',
      companyName: 'Công ty Cổ phần Bao bì Tân Khánh An',
      exchange: 'UPCOM',
      shortName: 'BAO BÌ TÂN KHÁNH AN',
      companyNameEn: 'TAN KHANH AN PACKAGING JOINT STOCK COMPANY'
    },
    {
      code: 'SBR',
      companyName: 'Công ty cổ phần Cao su Sông Bé',
      exchange: 'UPCOM',
      shortName: 'Cao su Sông Bé',
      companyNameEn: 'Song Be Rubber Joint Stock Company'
    },
    {
      code: 'SKN',
      companyName: 'Công ty cổ phần Nước giải khát Sanna Khánh Hòa',
      exchange: 'UPCOM',
      shortName: 'Nc g.khát Sanna',
      companyNameEn: 'Sanna Khanh Hoa Beverage Joint Stock Company'
    },
    {
      code: 'BLW',
      companyName: 'Công ty cổ phần Cấp nước Bạc Liêu',
      exchange: 'UPCOM',
      shortName: 'Cấp nc Bạc Liêu',
      companyNameEn: 'Bac Lieu Water Supply Joint Stock Company'
    },
    {
      code: 'DWS',
      companyName: 'Công ty cổ phần Cấp nước và Môi trường đô thị Đồng Tháp',
      exchange: 'UPCOM',
      shortName: 'C.nước và MTĐT Đ.Tháp',
      companyNameEn: 'Dong Thap Water Supply & Environment Joint – Stock Company'
    },
    {
      code: 'FIR',
      companyName: 'Công ty Cổ phần Địa ốc First Real',
      exchange: 'HOSE',
      shortName: 'Địa ốc First Real',
      companyNameEn: 'First Real Joint Stock Company'
    },
    {
      code: 'PBT',
      companyName: 'Công ty Cổ phần Nhà và Thương mại Dầu khí',
      exchange: 'UPCOM',
      shortName: 'Nhà & T.mại Dầu khí',
      companyNameEn: 'Petro VietNam Building and Commercial Joint Stock Company'
    },
    {
      code: 'TLI',
      companyName: 'Công ty cổ phần May Quốc Tế Thắng Lợi',
      exchange: 'UPCOM',
      shortName: 'May Q.tế Thắng Lợi',
      companyNameEn: 'Thang Loi International Garment Joint Stock Company'
    },
    {
      code: 'TVH',
      companyName: 'Công ty cổ phần Tư vấn Xây dựng công trình Hàng hải',
      exchange: 'UPCOM',
      shortName: 'Tư vấn XD Hàng Hải',
      companyNameEn: 'Construction consultation Joint Stock Company for Maritime Building'
    },
    {
      code: 'VDB',
      companyName: 'Công ty cổ phần Vận tải và Chế biến Than Đông Bắc',
      exchange: 'UPCOM',
      shortName: 'Than Đông Bắc',
      companyNameEn: 'Dong Bac Transport and Processing of Coal Joint Stock Company'
    },
    {
      code: 'XDH',
      companyName: 'Công ty cổ phần Đầu tư Xây dựng Dân dụng Hà Nội',
      exchange: 'UPCOM',
      shortName: 'XD dân dụng HN',
      companyNameEn: 'Hanoi Civil Construction Investment Joint Stock Company'
    },
    {
      code: 'VSE',
      companyName: 'Công ty cổ phần Dịch vụ Đường cao tốc Việt Nam',
      exchange: 'UPCOM',
      shortName: 'DV Đường cao tốc',
      companyNameEn: 'Vietnam Expressway Services Joint Stock Company'
    },
    {
      code: 'BCB',
      companyName: 'Công ty cổ phần 397',
      exchange: 'UPCOM',
      shortName: 'CTCP 397',
      companyNameEn: '397 Joint Stock Company'
    },
    {
      code: 'NSS',
      companyName: 'Công ty cổ phần Nông Súc Sản Đồng Nai',
      exchange: 'UPCOM',
      shortName: 'Súc Sản Đồng Nai',
      companyNameEn: 'Dong Nai Agricultural Livestock Product Joint Stock Company'
    },
    {
      code: 'TDP',
      companyName: 'Công ty cổ phần Thuận Đức',
      exchange: 'HOSE',
      shortName: 'Thuận Đức',
      companyNameEn: 'Thuan Duc Joint Stock Company'
    },
    {
      code: 'TTE',
      companyName: 'Công ty cổ phần Đầu tư Năng lượng Trường Thịnh',
      exchange: 'HOSE',
      shortName: 'N.lg Trường Thịnh',
      companyNameEn: 'Truong Thinh Energy Investment Joint Stock Company'
    },
    {
      code: 'BNW',
      companyName: 'Công ty cổ phần Nước sạch Bắc Ninh',
      exchange: 'UPCOM',
      shortName: 'Nước sạch Bắc Ninh',
      companyNameEn: 'Bac Ninh Clean Water Joint Stock Company'
    },
    {
      code: 'ILB',
      companyName: 'Công ty Cổ phần ICD Tân Cảng - Long Bình',
      exchange: 'HOSE',
      shortName: 'ICD Tân Cảng- Long Bình',
      companyNameEn: 'ICD Tan Cang - Long Binh Joint Stock Company'
    },
    {
      code: 'TN1',
      companyName: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ TNS HOLDINGS',
      exchange: 'HOSE',
      shortName: 'TMDV TNS HOLDINGS',
      companyNameEn: 'TNS Holdings Commercial and Services Joint Stock Company'
    },
    {
      code: 'USD',
      companyName: 'Công ty cổ phần Công trình Đô thị Sóc Trăng',
      exchange: 'UPCOM',
      shortName: 'Đô thị Sóc Trăng',
      companyNameEn: 'Soc Trang Public Works Joint Stock Company'
    },
    {
      code: 'MSH',
      companyName: 'Công ty cổ phần May Sông Hồng',
      exchange: 'HOSE',
      shortName: 'May Sông Hồng',
      companyNameEn: 'Song Hong Garment Joint Stock Company'
    },
    {
      code: 'HVH',
      companyName: 'Công ty cổ phần Đầu tư và Công nghệ HVC',
      exchange: 'HOSE',
      shortName: 'Đ.tư và C.nghệ HVC',
      companyNameEn: 'HVC Investment and Technology Joint Stock Company'
    },
    {
      code: 'BLU',
      companyName: 'Công ty cổ phần Công trình Đô thị Bạc Liêu',
      exchange: 'UPCOM',
      shortName: 'Đô thị Bạc Liêu',
      companyNameEn: 'Bac Lieu Urban Project Joint Stock Company'
    },
    {
      code: 'C4G',
      companyName: 'Công ty cổ phần Tập đoàn CIENCO4',
      exchange: 'UPCOM',
      shortName: 'CTCP Tập đoàn CIENCO4',
      companyNameEn: 'CIENCO4 Group Joint Stock Company'
    },
    {
      code: 'FOC',
      companyName: 'Công ty cổ phần Dịch vụ Trực tuyến FPT',
      exchange: 'UPCOM',
      shortName: 'Dịch vụ trực tuyến FPT',
      companyNameEn: 'FPT ONLINE JOINT STOCK COMPANY'
    },
    {
      code: 'DCG',
      companyName: 'Công ty cổ phần Tổng Công ty May Đáp Cầu',
      exchange: 'UPCOM',
      shortName: 'May Đáp Cầu',
      companyNameEn: 'DAP CAU GARMENT CORPORATION JOINT STOCK COMPANY'
    },
    {
      code: 'PAS',
      companyName: 'CÔNG TY CỔ PHẦN QUỐC TẾ PHƯƠNG ANH',
      exchange: 'UPCOM',
      shortName: 'QUỐC TẾ PHƯƠNG ANH',
      companyNameEn: 'PHUONG ANH INTERNATIONAL JOINT STOCK COMPANY'
    },
    {
      code: 'BMG',
      companyName: 'Công ty Cổ phần May Bình Minh',
      exchange: 'UPCOM',
      shortName: 'May Bình Minh',
      companyNameEn: 'Binh Minh Garment Joint Stock Company'
    },
    {
      code: 'PGN',
      companyName: 'Công ty cổ phần Phụ Gia Nhựa',
      exchange: 'HNX',
      shortName: 'CTCP Phụ Gia Nhựa',
      companyNameEn: 'Plastic Additives Joint Stock Company'
    },
    {
      code: 'GLC',
      companyName: 'Công ty cổ phần Vàng Lào Cai',
      exchange: 'UPCOM',
      shortName: 'Vàng Lào Cai',
      companyNameEn: 'Lao Cai Gold Joint Stock Company'
    },
    {
      code: 'UDL',
      companyName: 'Công ty Cổ phần Đô thị và Môi trường Đắk Lắk',
      exchange: 'UPCOM',
      shortName: 'Đô thị & M.trg Đắk Lắk',
      companyNameEn: 'Dak Lak Urban and Environment Joint Stock Company'
    },
    {
      code: 'VHE',
      companyName: 'Công ty cổ phần Dược liệu và Thực phẩm Việt Nam',
      exchange: 'HNX',
      shortName: 'D.liệu và th.phẩm VN',
      companyNameEn: 'Vietnam Herbs and Foods Joint Stock Company'
    },
    {
      code: 'TAR',
      companyName: 'Công ty cổ phần Nông nghiệp Công nghệ cao Trung An',
      exchange: 'HNX',
      shortName: 'NN C.nghệ Trung An',
      companyNameEn: 'Trung An Hi - Tech Farming Joint Stock Company'
    },
    {
      code: 'SHE',
      companyName: 'Công ty cổ phần Phát triển năng lượng Sơn Hà',
      exchange: 'HNX',
      shortName: 'P.triển n.lượng Sơn Hà',
      companyNameEn: 'Son Ha Development Of Renewable Energy Joint Stock Company'
    },
    {
      code: 'NSL',
      companyName: 'Công ty Cổ phần cấp nước Sơn La',
      exchange: 'UPCOM',
      shortName: 'Cấp nước Sơn La',
      companyNameEn: 'Son La Water Supply Joint Stock Company'
    },
    {
      code: 'NTH',
      companyName: 'Công ty cổ phần Thủy điện Nước trong',
      exchange: 'HNX',
      shortName: 'Thủy điện Nước trong',
      companyNameEn: 'Nuoc Trong Hydro - Power Joint Stock Company'
    },
    {
      code: 'BOT',
      companyName: 'Công ty cổ phần BOT Cầu Thái Hà',
      exchange: 'UPCOM',
      shortName: 'BOT Cầu Thái Hà',
      companyNameEn: 'Thai Ha Bridge BOT Joint Stock Company'
    },
    {
      code: 'SIP',
      companyName: 'Công ty Cổ phần Đầu tư Sài Gòn VRG',
      exchange: 'UPCOM',
      shortName: 'Đầu tư Sài Gòn VRG',
      companyNameEn: 'Sai Gon VRG Investment Corporation'
    },
    {
      code: 'DUS',
      companyName: 'CÔNG TY CỔ PHẦN DỊCH VỤ ĐÔ THỊ ĐÀ LẠT',
      exchange: 'UPCOM',
      shortName: 'DỊCH VỤ ĐÔ THỊ ĐÀ LẠT',
      companyNameEn: 'DALAT URBAN SERVER JOINT STOCK COMPANY'
    },
    {
      code: 'CSI',
      companyName: 'Công ty Cổ phần Chứng Khoán Kiến Thiết Việt Nam',
      exchange: 'UPCOM',
      shortName: 'C.Khoán Kiến thiết VN',
      companyNameEn: 'VIETNAM Construction Securities JSC'
    },
    {
      code: 'HD8',
      companyName: 'Công ty cổ phần Đầu tư phát triển nhà và đô thị HUD8',
      exchange: 'UPCOM',
      shortName: 'ĐTPT nhà và đ.thị HUD8',
      companyNameEn: 'Housing and Urban Development Investment Joint Stock Company HUD8'
    },
    {
      code: 'SOV',
      companyName: 'Công ty Cổ phần Mắt kính Sài Gòn',
      exchange: 'UPCOM',
      shortName: 'Mắt kính S.Gòn',
      companyNameEn: 'SaiGon Optic Company'
    },
    {
      code: 'ABS',
      companyName: 'Công ty Cổ phần Dịch vụ Nông nghiệp Bình Thuận',
      exchange: 'HOSE',
      shortName: 'Nông nghiệp Bình Thuận',
      companyNameEn: 'Binh Thuan Agriculture Services JSC'
    },
    {
      code: 'CT5',
      companyName: 'CÔNG TY CỔ PHẦN 319.5',
      exchange: 'UPCOM',
      shortName: 'CÔNG TY 319.5',
      companyNameEn: '319.5 JOINT STOCK COMPANY'
    },
    {
      code: 'DTB',
      companyName: 'CÔNG TY CỔ PHẦN CÔNG TRÌNH ĐÔ THỊ BẢO LỘC',
      exchange: 'UPCOM',
      shortName: 'ĐÔ THỊ BẢO LỘC',
      companyNameEn: 'BAO LOC CITY URBAN PROJECTS JOINT STOCK COMPANY'
    },
    {
      code: 'PQN',
      companyName: 'Công ty Cổ phần Dịch vụ Dầu khí Quảng Ngãi PTSC',
      exchange: 'UPCOM',
      shortName: 'PTSC Quảng Ngãi',
      companyNameEn: 'PTSC Quang Ngai Joint Stock Company'
    },
    {
      code: 'AAS',
      companyName: 'Công ty Cổ phần Chứng khoán SmartInvest',
      exchange: 'UPCOM',
      shortName: 'Chứng khoán SmartInvest',
      companyNameEn: 'SmartInvest Securities Joint Stock Company'
    },
    {
      code: 'AQN',
      companyName: 'Công ty Cổ phần 28 Quảng Ngãi',
      exchange: 'UPCOM',
      shortName: 'AGTEX',
      companyNameEn: '28 Quang Ngai Joint Stock Company'
    },
    {
      code: 'DNB',
      companyName: 'Công ty TNHH MTV Sách và Thiết bị trường học tỉnh Đắk Nông',
      exchange: 'UPCOM',
      shortName: 'Sách Đắk Nông',
      companyNameEn: 'Book and Educational equipment of Dak Nong Company Limited'
    },
    {
      code: 'PNP',
      companyName: 'Công ty Cổ phần Tân Cảng - Phú Hữu',
      exchange: 'UPCOM',
      shortName: 'CTCP Tân Cảng - Phú Hữu',
      companyNameEn: 'Phu Huu - Newport Corporation'
    },
    {
      code: 'SIG',
      companyName: 'Công ty Cổ phần Đầu tư và Thương mại Sông Đà',
      exchange: 'UPCOM',
      shortName: 'Đầu tư T.mại Sông Đà',
      companyNameEn: 'Songda Investment and Trading Joint Stock Company'
    },
    {
      code: 'IBD',
      companyName: 'Công ty Cổ phần In Tổng hợp Bình Dương',
      exchange: 'UPCOM',
      shortName: 'In Tổng hợp Bình Dương',
      companyNameEn: 'Binh Duong General Printing Joint Stock Company'
    },
    {
      code: 'CFV',
      companyName: 'Công ty cổ phần Cà phê Thắng Lợi',
      exchange: 'UPCOM',
      shortName: 'Cà phê Thắng Lợi',
      companyNameEn: 'Thang Loi Coffee Joint Stock Company'
    },
    {
      code: 'MTB',
      companyName: 'CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ TỈNH THÁI BÌNH',
      exchange: 'UPCOM',
      shortName: 'MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ TỈNH THÁI BÌNH',
      companyNameEn: 'THAI BINH ENVIRONMENT AND URBAN PROJECTS JOINT STOCK COMPANY'
    },
    {
      code: 'MHY',
      companyName: 'Công ty TNHH MTV Môi trường và Công trình Đô thị Hưng Yên',
      exchange: 'UPCOM',
      shortName: 'Đô thị Hưng Yên',
      companyNameEn: 'Hung Yen Urban Environment and Public Works Company Limited'
    },
    {
      code: 'BXT',
      companyName: 'Ban Quản lý và Điều hành Bến xe tàu',
      exchange: 'UPCOM',
      shortName: 'BQL và ĐH Bến xe tàu',
      companyNameEn: 'Hau Giang Bus and Boat Station Joint Stock Company'
    },
    {
      code: 'TAN',
      companyName: 'Công ty TNHH MTV Cà phê Thuận An',
      exchange: 'UPCOM',
      shortName: 'Cà Phê Thuận An',
      companyNameEn: 'Thuan An Coffee company limited'
    },
    {
      code: 'NDW',
      companyName: 'Công ty Cổ phần Cấp nước Nam Định',
      exchange: 'UPCOM',
      shortName: 'Cấp nước Nam Định',
      companyNameEn: 'NAM DINH WATER SUPPLY JOINT STOCK COMPANY'
    },
    {
      code: 'DPD',
      companyName: 'Công ty Cổ phần Cao su Đồng Phú - Đắk Nông',
      exchange: 'UPCOM',
      shortName: 'Cao su Đồng Phú - Đắk Nông',
      companyNameEn: 'Dong Phu - Dak Nong Rubber Joint Stock Company'
    },
    {
      code: 'DXD',
      companyName: 'Công ty cổ phần Đầu tư và Xây dựng - VVMI',
      exchange: 'UPCOM',
      shortName: 'Đầu tư và Xây dựng VVMI',
      companyNameEn: 'VVMI Investment and Construction Joint Stock Company'
    },
    {
      code: 'HLT',
      companyName: 'Công ty Cổ phần Dệt may Hoàng Thị Loan',
      exchange: 'UPCOM',
      shortName: 'Dệt may Hoàng Thị Loan',
      companyNameEn: 'Hoang Thi Loan Textile and Garment Joint Stock Company'
    },
    {
      code: 'EBA',
      companyName: 'Công ty Cổ phần Điện Bắc Nà',
      exchange: 'HNX',
      shortName: 'Điện Bắc Nà',
      companyNameEn: 'BAC NA ELECTRICITY JOINT STOCK COMPANY'
    },
    {
      code: 'BCV',
      companyName: 'Công ty Cổ phần Du lịch & Thương mại Bằng Giang Cao Bằng',
      exchange: 'UPCOM',
      shortName: 'CTCP Bằng Giang',
      companyNameEn: 'Vimico Cao Bang Bang Giang Travel and Trading Joint Stock Company'
    },
    {
      code: 'MCM',
      companyName: 'CÔNG TY CỔ PHẦN GIỐNG BÒ SỮA MỘC CHÂU',
      exchange: 'UPCOM',
      shortName: 'Giống Bò sữa Mộc Châu',
      companyNameEn: 'MOCCHAU DAIRY CATTLE BREEDING JOINT STOCK COMPANY'
    },
    {
      code: 'PLO',
      companyName: 'Công ty Cổ phần Kho vận Petec',
      exchange: 'UPCOM',
      shortName: 'Kho vận Petec',
      companyNameEn: 'Petec Logistics Joint Stock Company'
    },
    {
      code: 'NJC',
      companyName: 'Công ty Cổ phần May Nam Định',
      exchange: 'UPCOM',
      shortName: 'May Nam Định',
      companyNameEn: 'Nam Dinh Garment Joint Stock Company'
    },
    {
      code: 'PRE',
      companyName: 'TỔNG CÔNG TY CỔ PHẦN TÁI BẢO HIỂM PVI',
      exchange: 'HNX',
      shortName: 'TÁI BẢO HIỂM PVI',
      companyNameEn: 'PVI REINSURANCE JOINT STOCK CORPORATION'
    },
    {
      code: 'GIC',
      companyName: 'Công ty Cổ phần Đầu tư dịch vụ và Phát triển Xanh',
      exchange: 'HNX',
      shortName: 'Đầu tư dịch vụ và Phát triển Xanh',
      companyNameEn: 'GREEN DEVELOPMENT AND INVESTMENT SERVICE JOINT STOCK COMPANY'
    },
    {
      code: 'SZB',
      companyName: 'Công ty cổ phần Sonadezi Long Bình',
      exchange: 'HNX',
      shortName: 'Sonadezi Long Bình',
      companyNameEn: 'Sonadezi Long Binh Shareholding Company'
    },
    {
      code: 'TDF',
      companyName: 'Công ty cổ phần Trung Đô',
      exchange: 'UPCOM',
      shortName: 'CTCP Trung Đô',
      companyNameEn: 'Trung Do Joint - Stock Company'
    },
    {
      code: 'PLE',
      companyName: 'Công ty Cổ phần Tư vấn Xây Dựng Petrolimex',
      exchange: 'UPCOM',
      shortName: 'Công ty Petrolimex',
      companyNameEn: 'Petrolimex Engineering Joint Stock Company'
    },
    {
      code: 'VW3',
      companyName: 'Công ty Cổ Phần VIWASEEN3',
      exchange: 'UPCOM',
      shortName: 'VIWASEEN3',
      companyNameEn: 'VIWASEEN3 JOINT STOCK COMPANY'
    },
    {
      code: 'IPH',
      companyName: 'Công ty cổ phần In và Phát hành biểu mẫu thống kê',
      exchange: 'UPCOM',
      shortName: 'In Phát hành biểu mẫu',
      companyNameEn: 'Print and Statistical Form Publishment Joint Stock Company'
    },
    {
      code: 'GAB',
      companyName: 'CÔNG TY CỔ PHẦN ĐẦU TƯ KHAI KHOÁNG & QUẢN LÝ TÀI SẢN FLC',
      exchange: 'HOSE',
      shortName: 'Kh.khoáng & QLTS FLC',
      companyNameEn: 'FLC MINING INVESTMENT & ASSET MANAGEMENT JOINT STOCK COMPANY'
    },
    {
      code: 'CAB',
      companyName: 'CÔNG TY CỔ PHẦN TỔNG CÔNG TY TRUYỀN HÌNH CÁP VIỆT NAM',
      exchange: 'UPCOM',
      shortName: 'Truyền hình cáp VN',
      companyNameEn: 'VIETNAM TELEVISION CABLE JOINT STOCK COMPANY'
    },
    {
      code: 'E29',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Kỹ thuật 29',
      exchange: 'UPCOM',
      shortName: 'X.dựng & Kỹ thuật 29',
      companyNameEn: '29 INVESTMENT CONSTRUCTION AND ENGINEERING JOINT STOCK COMPANY'
    },
    {
      code: 'BNA',
      companyName: 'Công ty Cổ phần Đầu tư Sản xuất Bảo Ngọc',
      exchange: 'HNX',
      shortName: 'Đầu tư SX Bảo Ngọc',
      companyNameEn: 'Bao Ngoc Investment Production Corporation'
    },
    {
      code: 'CAM',
      companyName: 'Công ty cổ phần Môi trường đô thị Cà Mau',
      exchange: 'UPCOM',
      shortName: 'Đô thị Cà Mau',
      companyNameEn: 'Ca Mau Urban Enviroment Limited Company'
    },
    {
      code: 'THP',
      companyName: 'Công ty cổ phần Thủy sản và Thương mại Thuận Phước',
      exchange: 'UPCOM',
      shortName: 'Thủy sản Thuận Phước',
      companyNameEn: 'Thuan Phuoc Seafoods and Trading Corporation'
    },
    {
      code: 'MEG',
      companyName: 'CÔNG TY CỔ PHẦN MEGRAM',
      exchange: 'UPCOM',
      shortName: 'CTCP MEGRAM',
      companyNameEn: 'MEGRAM JOINT STOCK COMPANY'
    },
    {
      code: 'MML',
      companyName: 'Công ty Cổ phần Masan MEATLife',
      exchange: 'UPCOM',
      shortName: 'Masan MEATLife',
      companyNameEn: 'Masan MeatLife Corporation'
    },
    {
      code: 'CPW',
      companyName: 'CÔNG TY CỔ PHẦN CÔNG TRÌNH GIAO THÔNG CÔNG CHÁNH',
      exchange: 'UPCOM',
      shortName: 'G.thông Công Chánh',
      companyNameEn: 'COMMUNICATIONS AND PUBLIC WORKS JOINT STOCK COMPANY'
    },
    {
      code: 'NNQ',
      companyName: 'Công ty cổ phần Giống nông nghiệp Quảng Nam',
      exchange: 'UPCOM',
      shortName: 'Giống Nông nghiệp Q.Nam',
      companyNameEn: 'Quang Nam Agricultural Varieties Joint Stock Company'
    },
    {
      code: 'DRG',
      companyName: 'Công ty Cổ phân cao su Đắk Lắk',
      exchange: 'UPCOM',
      shortName: 'DAKRUCO',
      companyNameEn: 'Dak Lak Rubber Joint Stock Company'
    },
    {
      code: 'HGA',
      companyName: 'CÔNG TY CP NÔNG NGHIỆP CÔNG NGHỆ CAO HẬU GIANG',
      exchange: 'UPCOM',
      shortName: 'Nông nghiệp công nghệ cao Hậu Giang',
      companyNameEn: 'HAU GIANG HIGH - TECH AGRICULTURE JOINT STOCK COMPANY'
    },
    {
      code: 'AGG',
      companyName: 'CTCP Đầu tư và Phát triển Bất động sản An Gia',
      exchange: 'HOSE',
      shortName: 'Bất động sản An Gia',
      companyNameEn: 'An Gia Real Estate Investment and Development Corporation'
    },
    {
      code: 'GTK',
      companyName: 'Công ty Cổ phần Giầy Thụy Khuê',
      exchange: 'UPCOM',
      shortName: 'Giầy Thụy Khuê',
      companyNameEn: 'Thuy Khue Shoes Joint Stock Company'
    },
    {
      code: 'ADG',
      companyName: 'Công ty Cổ phần Clever Group',
      exchange: 'HOSE',
      shortName: 'CTCP Clever Group',
      companyNameEn: 'Clever Group Corporation'
    },
    {
      code: 'CCA',
      companyName: 'Công ty cổ phần Xuất nhập khẩu Thủy sản Cần Thơ',
      exchange: 'UPCOM',
      shortName: 'XNK Thủy sản Cần Thơ',
      companyNameEn: 'Can Tho Import Export Seafood Joint Stock Company'
    },
    {
      code: 'TR1',
      companyName: 'Công ty Cổ phần Vận tải 1 Traco',
      exchange: 'UPCOM',
      shortName: 'Vận tải 1 Traco',
      companyNameEn: 'Traco Transport Joint Stock Corporation No.1'
    },
    {
      code: 'HGC',
      companyName: 'Trung tâm Quy hoạch - Kiến trúc tỉnh Hậu Giang',
      exchange: 'UPCOM',
      shortName: 'Q.hoạch k.trúc Hậu Giang',
      companyNameEn: 'Hau Giang Center for Architecture - Planning'
    },
    {
      code: 'GQN',
      companyName: 'Công ty cổ phần Giống Thủy sản Quảng Nam',
      exchange: 'UPCOM',
      shortName: 'Giống thủy sản Quảng Nam',
      companyNameEn: 'Quang Nam Aquaculture Joint Stock Company'
    },
    {
      code: 'QNT',
      companyName: 'CÔNG TY CỔ PHẦN TƯ VẤN VÀ ĐẦU TƯ PHÁT TRIỂN QUẢNG NAM',
      exchange: 'UPCOM',
      shortName: 'TƯ VẤN VÀ ĐẦU TƯ PHÁT TRIỂN QUẢNG NAM',
      companyNameEn: 'QUANG NAM CONSULTING AND INVESTMENT DEVELOPMENT JOINT STOCK COMPANY'
    },
    {
      code: 'HSP',
      companyName: 'Công ty cổ phần Sơn Tổng hợp Hà Nội',
      exchange: 'UPCOM',
      shortName: 'Sơn Tổng hợp Hà Nội',
      companyNameEn: 'Hanoi Synthetic Paint Joint Stock Company'
    },
    {
      code: 'THD',
      companyName: 'CÔNG TY CỔ PHẦN THAIHOLDINGS',
      exchange: 'HNX',
      shortName: 'THAIHOLDINGS',
      companyNameEn: 'THAIHOLDINGS JOINT STOCK COMPANY'
    },
    {
      code: 'DKH',
      companyName: 'Trung tâm Đăng kiểm phương tiện Giao thông Thủy bộ',
      exchange: 'UPCOM',
      shortName: 'Đăng kiểm GT Thủy bộ',
      companyNameEn: 'Hau Giang Register JSC'
    },
    {
      code: 'PSH',
      companyName: 'Công ty Cổ phần Thương mại Đầu tư Dầu khí Nam Sông Hậu',
      exchange: 'HOSE',
      shortName: 'Dầu khí Nam Sông Hậu',
      companyNameEn: 'NAM SONG HAU TRADING INVESTING PETROLEUM JOINT STOCK COMPANY'
    },
    {
      code: 'VXT',
      companyName: 'Công ty Cổ phần Kho vận và Dịch vụ thương mại',
      exchange: 'UPCOM',
      shortName: 'Kho vận & DV Th.mại',
      companyNameEn: 'TRANSPORT - WAREHOUSING AND TRADE SERVICE JOINT STOCK COMPANY'
    },
    {
      code: 'STH',
      companyName: 'Công ty cổ phần phát hành sách Thái Nguyên',
      exchange: 'UPCOM',
      shortName: 'Sách Thái Nguyên',
      companyNameEn: 'Thai Nguyen Book Distribution Joint Stock Company'
    },
    {
      code: 'HAW',
      companyName: 'Trung tâm Nước sạch và Vệ sinh môi trường nông thôn',
      exchange: 'UPCOM',
      shortName: 'Vệ sinh m.trg nông thôn',
      companyNameEn: 'Provincial Center For Rural Water Supply and Sanitation'
    },
    {
      code: 'HGR',
      companyName: 'Công ty cổ phần Tài nguyên và Môi trường Hậu Giang',
      exchange: 'UPCOM',
      shortName: 'T.nguyên và M.trường Hậu Giang',
      companyNameEn: 'Hau Giang Resources And Enviroment Stock Company'
    },
    {
      code: 'DKC',
      companyName: 'Công ty Cổ phần Chợ Lạng Sơn',
      exchange: 'UPCOM',
      shortName: 'Chợ Lạng Sơn',
      companyNameEn: 'Lang Son Market Joint Stock Company'
    },
    {
      code: 'MA1',
      companyName: 'CÔNG TY CỔ PHẦN THIẾT BỊ',
      exchange: 'UPCOM',
      shortName: 'CTCP THIẾT BỊ',
      companyNameEn: 'MACHINERY JOINT STOCK COMPANY'
    },
    {
      code: 'SCA',
      companyName: 'CÔNG TY CỔ PHẦN NÔNG NGHIỆP SÔNG CON',
      exchange: 'UPCOM',
      shortName: 'NÔNG NGHIỆP SÔNG CON',
      companyNameEn: 'SONG CON AGRICULTURE JOINT STOCK COMPANY'
    },
    {
      code: 'SVD',
      companyName: 'Công ty Cổ phần Đầu tư và Thương mại Vũ Đăng',
      exchange: 'HOSE',
      shortName: 'Đầu tư và Thương mại Vũ Đăng',
      companyNameEn: 'VU DANG INVESTMENT & TRADING JOINT STOCK COMPANY'
    },
    {
      code: 'TTA',
      companyName: 'Công ty Cổ phần Đầu tư Xây dựng và Phát triển Trường Thành',
      exchange: 'HOSE',
      shortName: 'Đầu tư Xây dựng và Phát triển Trường Thành',
      companyNameEn: 'Truong Thanh Development and Construction Investment Joint Stock Company'
    },
    {
      code: 'GMA',
      companyName: 'Công ty Cổ phần Enteco Việt Nam',
      exchange: 'HNX',
      shortName: 'Enteco Việt Nam',
      companyNameEn: 'Viet Nam Enteco Corporation'
    },
    {
      code: 'MXC',
      companyName: 'Trung tâm Nông nghiệp Mùa Xuân',
      exchange: 'UPCOM',
      shortName: 'TT Nông nghiệp Mùa Xuân',
      companyNameEn: 'Spring Agricultural Center'
    },
    {
      code: 'CGL',
      companyName: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI GIA LAI',
      exchange: 'UPCOM',
      shortName: 'THƯƠNG MẠI GIA LAI',
      companyNameEn: 'GIA LAI TRADING JOINT STOCK COMPANY'
    },
    {
      code: 'MHP',
      companyName: 'CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ DỊCH VỤ ĐÔ THỊ VIỆT TRÌ',
      exchange: 'UPCOM',
      shortName: 'MÔI TRƯỜNG VÀ DỊCH VỤ ĐÔ THỊ VIỆT TRÌ',
      companyNameEn: 'VIET TRI ENVIRONMENT AND SERVICE JOINT STOCK COMPANY'
    },
    {
      code: 'TNH',
      companyName: 'Công ty Cổ phần Bệnh viện Quốc tế Thái Nguyên',
      exchange: 'HOSE',
      shortName: 'Bệnh viện Quốc tế Thái Nguyên',
      companyNameEn: 'Thai Nguyen International Hospital Joint Stock Company'
    },
    {
      code: 'BKG',
      companyName: 'Công ty Cổ phần Đầu tư BKG Việt Nam',
      exchange: 'HOSE',
      shortName: 'CTCP Đầu tư BKG',
      companyNameEn: 'BKG VIETNAM INVESTMENT JOINT STOCK COMPANY'
    },
    {
      code: 'DTE',
      companyName: 'Công ty cổ phần Đầu tư Năng lượng Đại Trường Thành Holdings',
      exchange: 'UPCOM',
      shortName: 'Công ty Đại Trường Thành',
      companyNameEn: 'Dai Truong Thanh Holdings Energy Investment Joint Stock Company'
    },
    {
      code: 'IDP',
      companyName: 'CÔNG TY CỔ PHẦN SỮA QUỐC TẾ',
      exchange: 'UPCOM',
      shortName: 'CTCP Sữa Quốc tế',
      companyNameEn: 'INTERNATIONAL DAIRY PRODUCTS JOINT STOCK COMPANY'
    },
    {
      code: 'CFM',
      companyName: 'Công ty cổ phần Đầu tư CFM',
      exchange: 'UPCOM',
      shortName: 'Đầu tư CFM',
      companyNameEn: 'CFM INVESTMENT JOINT STOCK COMPANY'
    },
    {
      code: 'DVG',
      companyName: 'CTCP TẬP ĐOÀN SƠN ĐẠI VIỆT',
      exchange: 'HNX',
      shortName: 'Sơn Đại Việt',
      companyNameEn: 'DAI VIET PAINT GROUP JOINT STOCK COMPANY'
    },
    {
      code: 'LPT',
      companyName: 'Lap Phuong Thanh PT JST',
      exchange: 'UPCOM',
      shortName: 'Công ty Lập Phương Thành',
      companyNameEn: 'Lap Phuong Thanh Production and Trading Joint Stock Company'
    }
  ];

  await connectMongoDB();

  await Promise.all(await data.map(async (item) => await CategoryModel.collection.create(item)))
    .then((result) => {
      console.log('CategoryModel result: ', result);
    })
    .catch((error) => console.log('CategoryModel error: ', error));

  await Promise.all(await symbols.map(async (item) => await SymbolModel.collection.create(item)))
    .then((result) => {
      console.log('SymbolModel result: ', result);
    })
    .catch((error) => console.log('CategoryModel error: ', error));
}

run();
