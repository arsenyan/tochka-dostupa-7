import React from 'react'

import { Context } from '../../components/Store'
import {
  Person,
  Program,
  Spekt,
} from '../../components/Store/Types'
import TextDropdown from '../../components/TextDropdown'
import CuratorsAvatars from '../../components/CuratorsAvatars'
import SpektCard from '../../components/Views/Cards/SpektCard'


type Props = {
  programId: string
  text?: boolean
}


class Template extends React.Component<Props, {}> {
  
  static contextType = Context

  renderText = (program: Program, opened: boolean) =>
    <TextDropdown
      initialOpen={opened}
      link={opened ? `/program/${program.link}` : `/program/${program.link}/text`}
      className='mb-s mb-md-l mb-lg-xl'
      shortDesc={program.shortDesc}
      additionalContent={
        <div className='d-flex flex-column flex-md-row flex-lg-column flex-xl-row mb-s mb-lg-0'>
          <CuratorsAvatars
            S
            curators={program?.curators}
            className='mr-2 mb-2'
          />
          <div className='d-flex flex-column'>
            <h3 className='h3'>
              {program?.curators
                ?.map((curator: Person) =>
                  <>
                    {curator.name}&nbsp;{curator.surname}
                  </>)
                ?.reduce((a: JSX.Element, b: JSX.Element, index: Number) =>
                  <>
                    {a}{index === (program?.curators?.length || 0) - 1 ? ' и ' : ', '}{b}
                  </>)}
            </h3>
            <div className='p p--xl font-spectral'>
              {program?.curatorTitle}
            </div>
          </div>
        </div>
      }
    >
      {program?.mainDesc}
    </TextDropdown>

  render = () => {
    const program: Program = this.context?.contentful?.programs
      ?.find((program: Program) => program.id === this.props.programId)

    return !program ? '' :
      this.props.text ?
        <div className="Program">
          <div className='container'>
            <div className='row'>
              <div className='col'>
                {this.renderText(program, true)}
              </div>
            </div>
          </div>
        </div>
        :
        <div className="Program">
          <div className='container'>
            <div className='row'>
              <div className='col-4 col-md-6 col-lg-12'>
                <h1 className='h1 mt-s mt-md-m mt-lg-l mb-m mb-md-l mb-lg-xl'>
                  {program?.name}
                </h1>
              </div>
            </div>

            {this.renderText(program, false)}

            <div className='row d-flex flex-row flex-wrap'>
              {this.context?.contentful?.spekts
                ?.filter((spekt: Spekt) =>
                  spekt?.program?.id === program.id
                  && spekt?.festival?.name?.includes?.('VII'))
                ?.map((spekt: Spekt) =>
                  <div className='Program__SpektCard-delimeter'>
                    <SpektCard
                      {...spekt}
                      avatarsL={this.props.programId === '6OfzgvjCzzT1xhlwDH2AfQ'}
                      className='SpektCard--Program'
                    />
                  </div>
              )}
            </div>
          </div>
        </div>
  }
}


export default Template