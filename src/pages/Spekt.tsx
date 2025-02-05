import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import _ from 'lodash'
import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import endOfYesterday from 'date-fns/endOfYesterday'
import isAfter from 'date-fns/isAfter'

import { Context } from '../components/Store'
import FormattedMessage from '../components/FormattedMessage'
import {
  Spekt as SpektType,
  Sponsor,
  MappedShow,
  Place
} from '../components/Store/Types'
import {
  Program,
  Online,
  Offline,
  Age
} from '../components/buttons'
import Dropdown from '../components/Dropdown'
import Error404 from '../components/Error404'
import Link from '../components/Link'

import camelize from '../utils/camelize'


type Props = RouteComponentProps<{
  param1: string
}>

type State = {
  currentOpened: number
}


class Spekt extends React.Component<Props, State> {

  state: State = {
    currentOpened: 0,
  }

  static contextType = Context

  render = () => {
    if (!this?.context?.ready)
      return ''

    let spekt = this.context?.contentful?.spekts
      ?.find((spekt: SpektType) =>
        spekt.link === this.props.location.pathname.replace('/spekt/', ''))

    if (!spekt)
      return <Error404 />
      
    spekt = {
      ...spekt,
      shows: _.values(this?.context?.contentful?.mappedDays || {})
        .map((day: MappedShow[]) =>
          day.filter((show: MappedShow) =>
            show.name === spekt.name && isAfter(show.dateObj, endOfYesterday())))
        .filter((day: MappedShow[]) =>
          day.length > 0)
    }

    console.log(spekt)

    return (
      <div className='Spekt'>
        <div className='container'>

          <div className='row mt-s d-flex flex-column flex-lg-row mb-s mb-md-m mb-lg-l'>
            <div className='col-4 col-md-6 col-lg-8 order-lg-2'>
              <div className='w-100 Spekt__cover-container'>
                <img
                  src={spekt?.cover?.file?.url}
                  alt={spekt?.cover?.file?.fileName}
                  className='w-100 h-auto'
                />
              </div>
            </div>

            <div className='col-4 col-md-6 col-lg-4 mt-s d-flex flex-column'>
              <h1 className='h1 mb-1'>
                {spekt?.name}
              </h1>
              <div className='h1 font-weight-normal font-spectral mb-xs'>
                {spekt?.persons}
              </div>
              <div className='d-flex flex-row flex-wrap'>
                <Program
                  text={spekt?.program?.name}
                  className='mr-2 mb-2'
                />
                {spekt?.online &&
                  <Online className='mr-2 mb-2' />
                }
                {spekt?.offline &&
                  <Offline className='mr-2 mb-2' />
                }
                {spekt?.age &&
                  <Age
                    text={spekt?.age}
                    className='mr-2 mb-2'
                  />
                }
              </div>
            </div>
          </div>


          <div className='row mb-m mb-md-l mb-lg-xl'>
            <div className='col-4 col-md-6 col-lg-4'>
              <div className='row d-flex flex-row flex-lg-column'>
                {spekt?.length &&
                  <div className='col-4 col-md-2 col-lg-12'>
                    <FormattedMessage
                      id='Spekt.length'
                      className='p p--s'
                    />
                    <h3 className='h3 h3--l mb-s'>
                      {spekt?.length}
                    </h3>
                  </div>
                }
                <div className='col-4 col-md-2 col-lg-8'>
                  <FormattedMessage
                    id='Spekt.stage'
                    className='p p--s'
                  />
                  {spekt?.ticketsAndSchedule?.tickets?.map((stage: Place, index: number) =>
                    <h3
                      key={index}
                      className='h3 h3--l mb-s'
                    >
                      {this.context.locale === 'rus' ? stage.venue : stage.venueEn}
                    </h3>
                  )}
                </div>
                {spekt?.sponsors?.length > 0 &&
                  <div className='col-4 col-md-2 col-lg-12 d-flex flex-column'>
                    <FormattedMessage
                      id='Spekt.sponsor'
                      className='p p--s'
                    />
                    {spekt?.sponsors?.map((sponsor: Sponsor) =>
                      <img
                        key={sponsor?.logo?.[0].file?.url}
                        src={sponsor?.logo?.[0].file?.url}
                        alt={sponsor?.logo?.[0].file?.fileName}
                        className='w-50 w-md-100 w-lg-50 h-auto'
                      />
                    )}
                  </div>
                }
              </div>
            </div>

            <div className='col-4 col-md-6 col-lg-8'>
              <div className='p p--l mb-m mb-lg-l'>
                {spekt.mainDesc}
              </div>

              {spekt.shows.length > 0 &&
                <Dropdown
                  spekt
                  className='mb-2 mb-md-3'
                  title={
                    <FormattedMessage
                      id='Spekt.buy'
                      className='h3 mb-0'
                    />}
                  opened={this.state.currentOpened === 0}
                  toggleOpened={() =>
                    this.setState({
                      currentOpened: this.state.currentOpened === 0 ?
                        -1
                        :
                        0
                    })}
                >
                  {spekt.shows
                    .map((day: MappedShow[]) =>
                      day?.map((show: MappedShow) =>
                        <div
                          key={show.id}
                          className='Spekt__show'
                        >
                          <div className='Spekt__show__date-time'>
                            {(() => {
                              const dateTime = format(
                                show.dateObj,
                                'dd.MM / iiii / HH:mm ',
                                { locale: this.context.locale === 'rus' ? ru : enUS })
                              const dateTimeSplitted = dateTime.split(' / ')

                              return dateTimeSplitted[0] + ' / ' + camelize(dateTimeSplitted[1]) + ' / ' + dateTimeSplitted[2]
                            })()}
                            <FormattedMessage id='Schedule.msk' />
                          </div>
                          <div className='Spekt__show__line'>
                            {show.offline ? <Offline /> : <Online />}
                          </div>
                          <Link
                            sameTab
                            to={`#event/${show.event_id || 765096}`}
                            data-accent-color='#b33d26'
                            className='Spekt__show__buy'
                            disabled={false}
                          >
                            <FormattedMessage id={show.offline ? 'Schedule.buy' : 'Schedule.register'} />
                          </Link>
                        </div>
                    ))
                  }
                </Dropdown>
              }

              {['howToOnline', 'howToOffline', 'instructions']
                .map((dropdown, index) =>
                  !spekt[dropdown] ?
                    ''
                    :
                    <Dropdown
                      key={dropdown}
                      spekt
                      className='mb-2 mb-md-3'
                      title={
                        <FormattedMessage
                          id={`Spekt.${dropdown}`}
                          className='h3 mb-0'
                        />}
                      opened={this.state.currentOpened === index + 1}
                      toggleOpened={() =>
                        this.setState({
                          currentOpened: this.state.currentOpened === index + 1 ?
                            -1
                            :
                            index + 1
                        })}
                    >
                      <div className='p p--l'>
                        {spekt[dropdown]}
                      </div>
                    </Dropdown>
              )}
            </div>
          </div>

        </div>
      </div>
    )
  }
}


export default withRouter(Spekt)