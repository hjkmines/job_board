import './JobSearch.css';
import React from 'react'
import { 
    MDBCol,
    MDBContainer, 
    MDBRow,
    MDBSwitch,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBInputGroup
} from 'mdb-react-ui-kit'
import CreateableSelect from 'react-select/creatable';
import Select from 'react-select';

// http://geodb-cities-api.wirefreethought.com/

const cityOptions = [
    {value:"New York", label:"New York"},
    {value:"Boston", label:"Boston"},
    {value:"Washington D.C.", label:"Washington, D.C."},
    {value:"Los Angeles", label:"Los Angeles"},
    {value:"San Fransisco", label:"San Fransisco"},
    {value:"Houston", label:"Houston"},
    {value:"Dallas", label:"Dallas"},
    {value:"Portland", label:"Portland"},
    {value:"Seattle", label:"Seattle"},
];


const stateOptions = [
    {value:"Alabama",label:"AL"},{value:"Alaska",label:"AK"},{value:"Arizona",label:"AZ"},{value:"Arkansas",label:"AR"},{value:"California",label:"CA"},{value:"Colorado",label:"CO"},{value:"Connecticut",label:"CT"},{value:"Delaware",label:"DE"},{value:"Florida",label:"FL"},{value:"Georgia",label:"GA"},{value:"Hawaii",label:"HI"},{value:"Idaho",label:"ID"},{value:"Illinois",label:"IL"},{value:"Indiana",label:"IN"},{value:"Iowa",label:"IA"},{value:"Kansas",label:"KS"},{value:"Kentucky",label:"KY"},{value:"Louisiana",label:"LA"},{value:"Maine",label:"ME"},{value:"Maryland",label:"MD"},{value:"Massachusetts",label:"MA"},{value:"Michigan",label:"MI"},{value:"Minnesota",label:"MN"},{value:"Mississippi",label:"MS"},{value:"Missouri",label:"MO"},{value:"Montana",label:"MT"},{value:"Nebraska",label:"NE"},{value:"Nevada",label:"NV"},{value:"New Hampshire",label:"NH"},{value:"New Jersey",label:"NJ"},{value:"New Mexico",label:"NM"},{value:"New York",label:"NY"},{value:"North Carolina",label:"NC"},{value:"North Dakota",label:"ND"},{value:"Ohio",label:"OH"},{value:"Oklahoma",label:"OK"},{value:"Oregon",label:"OR"},{value:"Pennsylvania",label:"PA"},{value:"Rhode Island",label:"RI"},{value:"South Carolina",label:"SC"},{value:"South Dakota",label:"SD"},{value:"Tennessee",label:"TN"},{value:"Texas",label:"TX"},{value:"Utah",label:"UT"},{value:"Vermont",label:"VT"},{value:"Virginia",label:"VA"},{value:"Washington",label:"WA"},{value:"West Virginia",label:"WV"},{value:"Wisconsin",label:"WI"},{value:"Wyoming",label:"WY"}]

    const experienceOptions = [
        {value: "0", label:"0 - no experience"},
        {value: "1", label:"internship ~ 6 months"},
        {value: "2", label:"1 year"},
        {value: "3", label:"2 years"},
    ]

    const sortByOptions = [
        {value:"remote", label:"Remote"},
        {value:"location", label:"Location"},
        {value:"experience", label:"Experience"},

    ]

    const handleSearch= (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const search = {
            search: data.get('search'),
            remote: data.get('remote'),
            city: data.get('city'),
            state: data.get('state'),
            exp: data.get('exp'),
            sortBy: data.get('sortBy')
        }
        console.log(search)
    }


export default function App () {


  return (
    <MDBContainer  fluid className='search2'>
    <form className='searchForm' onSubmit={handleSearch} >

    {/* first row - searchbutton and search input */}
        {/* 1st row. Search button and search input  */}
        <MDBRow className='searchRow1  justify-content-start gx-0'>
            <MDBCol fluid='true' size={2} className='searchBtnCol justify-content-end gr-0'>
               <MDBBtn type="submit" className='searchSubmitBtn' >
                    Search
               </MDBBtn>
            </MDBCol>
            <MDBCol size={8}  className="filterSearch">
                <MDBInput label="Search" type='text' className="searchInput" name='search'/>
            </MDBCol>
        </MDBRow>

    {/* second row */}
        <MDBRow className='d-flex searchRow2 gx-1 align-items-center justify-content-center'>
            <MDBCol size={2}  className="remoteSwitchCol ">
                <MDBSwitch id="remoteWork" label="Remote" value={'Remote'} aria-label='remote work toggle' name='remote'/>
            </MDBCol>
            <MDBCol size={3}  className='cityCol'>
               <CreateableSelect 
                isClearable='true'
                // isDisabled={isLoading}
                // isLoading={isLoading}
                // onChange={(newValue) => setValue(newValue)}
                // onCreateOption={handleCityCreate}
                placeholder="City" 
                className='CityLabel' 
                name='city'
                options={cityOptions} 
                />
            </MDBCol>
            <MDBCol size={2}  className=' stateCol'>
                <Select 
                    isClearable
                    className='basic-single' 
                    placeholder='State'  
                    name="state"
                    options={stateOptions} 
                />
            </MDBCol>
            <MDBCol size={2} className='expCol'> 
                <Select  
                    isClearable
                    className='basic-single'
                    classNamePrefix='select' 
                    placeholder='experience' 
                    name="exp" 
                    options={experienceOptions}
                />
            </MDBCol>
            <MDBCol size={2} className='sortByCol'>
                <Select className='basic-single' placeholder='sort by' name="sortBy" options={sortByOptions} />
            </MDBCol>
            <MDBCol size={1} className="moreToggleCol">
                <MDBDropdown className='moreDropDown' >
                <MDBIcon icon="ellipsis-h" size='2x' color='dark' />
                    <MDBDropdownToggle tag='a' className='moreFilter fas' icon="elipsis-h">
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem>settings</MDBDropdownItem>
                        <MDBDropdownItem>more and more</MDBDropdownItem>
                        <MDBDropdownItem>advanced filter</MDBDropdownItem>
                    </MDBDropdownMenu>

                </MDBDropdown>
            </MDBCol>
        </MDBRow>
            </form>
        
    </MDBContainer>

    // </MDBContainer>
  )
}
