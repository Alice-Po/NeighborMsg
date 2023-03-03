import React, { useEffect, useState } from 'react';
import { List, FunctionField, ReferenceField } from 'react-admin';
import { useSelector } from 'react-redux';
import { Toolbar, Button, Box, Typography, Container, Card } from '@material-ui/core';
import { Form, Field, FormSpy } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { MapList } from '@semapps/geo-components';
import { Show, ShowBase, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';
import { MapField } from '@semapps/geo-components';
import {Slider, withStyles, makeStyles } from '@material-ui/core';
import {ResourceContextProvider, CreateContextProvider, useCreateController} from 'react-admin';
import { CreateButton, useTranslate, SimpleList } from 'react-admin';
import { Avatar, useMediaQuery } from "@material-ui/core";
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { AvatarWithLabelField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
// import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';
// import { MapField } from '@semapps/geo-components';
import { Routes, Route, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const CustomizedSlider = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
        <div className={classes.margin} />        
      </div>
    )
  };

const MapWithContact = ({id}) => {


  return(
    <div>
        <p>MapWithContact</p>
        <ShowBase 
            id={id} 
            resource="Note" 
            basePath='/Note'>
            <SimpleShowLayout>
            <TextField source="pair:label" label="lal"/>
            <ReferenceField reference="Location" source="location" link={false}>
              <TextField source="vcard:given-name" label="adresse" />
              {/*<FunctionField label="titre" render={record =>{*/}
              {/*  console.log('location', record)*/}
              {/*  return null*/}
              {/*}*/}
              {/*    */}
              {/*    }/>*/}
                {/* <MapField
                    latitude={record => record.latitude}
                    longitude={record => record.longitude}
                /> */}
             </ReferenceField>
            
            </SimpleShowLayout>
        </ShowBase>

        <h1>Liste de contact</h1>
        {/*<List
            title="les contacts"
            actions={[<CreateButton label="app.action.add_contact" />]}
            // asides={[<ProfileCard />, <ShareContactCard />]}
            sort={{ field: 'vcard:given-name', order: 'ASC' }}
            perPage={1000}
            {...props}
            >
            <>
                <GridList xs={4} sm={2} linkType="show">
                <AvatarWithLabelField
                    label="vcard:given-name"
                    image="vcard:photo"
                    defaultLabel= "label de défaut"
                    labelColor="grey.300"
                />
                </GridList>
            </>
        </List>*/}
        
    </div>


    // <ResourceContextProvider value={props.resource}>
    //         <List pagination={false} perPage={1000} basePath="/Note" {...props}>
    //         {/* <MapList
    //             latitude={record => record.latitude}
    //             longitude={record => record.longitude}
    //             label={record => record.label}
    //             description={record => record.description}
    //         /> */}
    //         </List>
    // </ResourceContextProvider>
  )
};


const MapFilter = ({id}) => {
    const [km, setKm] = useState();

    return (
        <div>
            <MapWithContact id={id}/>
            <CustomizedSlider 
                onChange={value => console.log(value)}/>
        <p>le curseur a été placé à {km}</p>
        </div>
    );
};

const ContactFilter = () => {
    return (
        <div>
            <p>ContactFilter</p>
        </div>
    );
};

const FilterPage = () => {
    const [step, setStep] = useState("mapFilter");
    let {id} = useParams();
    id = decodeURIComponent(id)
    console.log("param", id)

  // Wait for all resources to be registered with Redux before continuing
  // Copied from https://github.com/marmelab/react-admin/blob/3.x/packages/ra-core/src/core/Resource.tsx#L73-L76
  const isRegistered = useSelector(state => !!state.admin.resources.Location);
  if (!isRegistered) return null;

//   const classes = useStyles();
//   const history = useHistory();

//   const onSubmit = useCallback(
//     ({ type, resourceType, exchangeType }) => {
//       const basePath = type === 'Offer' ? '/offers' : '/requests';
//       let source = {};
//       source['@type'] = 'mp:' + exchangeType + type;
//       source[`mp:${type.toLowerCase()}OfResourceType`] = 'pair:' + resourceType;
//       history.push(basePath + '/create?source=' + JSON.stringify(source));
//     },
//     [history]
//   );

  return (
    <div>
      {step === "mapFilter" ? <MapFilter id={id}/>
        : <ContactFilter/>      }
        <button onClick={() => setStep("contactFilter")} value="contact"/>
        <button onClick={() => setStep("mapFilter")} value="map"/>
    </div>
  );
};

export default FilterPage;
